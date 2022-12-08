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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signuprouter = void 0;
const express_1 = require("express");
const user_1 = require("../../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const common_1 = require("../../../common");
const router = (0, express_1.Router)();
exports.signuprouter = router;
router.post('/signup', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_1.User.findOne({ email });
    if (user)
        return next(new common_1.BadRequestError('user with the same email already exists'));
    const newUser = user_1.User.build({
        email,
        password
    });
    yield newUser.save();
    req.session = {
        jwt: jsonwebtoken_1.default.sign({ email, userId: newUser._id }, process.env.JWT_KEY, { expiresIn: '10h' })
    };
    res.sendStatus(201).send(newUser);
}));
