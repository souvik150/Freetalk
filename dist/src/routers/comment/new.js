"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newCommentRouter = void 0;
const express_1 = require("express");
const comment_1 = require("../../models/comment");
const post_1 = require("../../models/post");
const common_1 = require("../../../common");
const router = (0, express_1.Router)();
exports.newCommentRouter = router;
router.post('/api/comment/new/:postId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, content } = req.body;
    const { postId } = req.params;
    if (!content) {
        return next(new common_1.BadRequestError('Content is required'));
    }
    const newComment = comment_1.Comment.build({
        userName: userName ? userName : 'anonymous',
        content: content,
    });
    yield newComment.save();
    const updatedPost = yield post_1.Post.findOneAndUpdate({ _id: postId }, { $push: { comments: newComment } }, { new: true });
    res.status(201).send(updatedPost);
}));
