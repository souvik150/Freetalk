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
exports.deleteCommentRouter = void 0;
const express_1 = require("express");
const post_1 = require("../../models/post");
const common_1 = require("../../../common");
const router = (0, express_1.Router)();
exports.deleteCommentRouter = router;
router.delete('/api/comment/:commentId/delete/:postId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId, postId } = req.params;
    if (!commentId || !postId) {
        return next(new common_1.BadRequestError('Post id and Comment id are both required'));
    }
    try {
        yield post_1.Post.findOneAndRemove({
            _id: commentId
        });
    }
    catch (error) {
        next(new Error('Comment cannot be updated'));
    }
    yield post_1.Post.findOneAndUpdate({ _id: postId }, { $pull: { comments: commentId } });
    res.status(200).json({ success: true });
}));
