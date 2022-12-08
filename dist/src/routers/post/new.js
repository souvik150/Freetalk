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
exports.newPostRouter = void 0;
const express_1 = require("express");
const post_1 = require("../../models/post");
const common_1 = require("../../../common");
const user_1 = require("../../models/user");
const router = (0, express_1.Router)();
exports.newPostRouter = router;
router.post('/api/post/new', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    if (!title || !content) {
        return next(new common_1.BadRequestError('Title and content are required'));
    }
    const newPost = post_1.Post.build({
        title: title,
        content: content,
    });
    yield newPost.save();
    yield user_1.User.findOneAndUpdate({
        _id: req.currentUser.userId
    });
    res.status(201).send(newPost);
}));
