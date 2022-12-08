import {Router, Request, Response, NextFunction} from "express";
import {Post} from '../../models/post';
import {BadRequestError} from "../../../common";
import {User} from "../../models/user";

const router = Router()

router.post('/api/post/new', async (req: Request, res: Response, next: NextFunction) => {
    const {title, content} = req.body;

    if(!title || !content) {
        return next(new BadRequestError('Title and content are required'))
    }

    const newPost = Post.build({
        title: title,
        content: content,
    })
    await newPost.save()

    await User.findOneAndUpdate({
        _id: req.currentUser!.userId
    })

    res.status(201).send(newPost)
})

export {router as newPostRouter};