import {Router, Request, Response, NextFunction} from 'express';
import Post from "../../models/post";

const router = Router()

router.post('/api/post/update/:id', async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const {content, title} = req.body;

    if(!id) {
        const error = new Error('post id is required') as CustomError;
        error.status = 404;
        next(error)
    }

    let updatedPost;

    try {
        const updatedPost = await Post.findOneAndUpdate(
            {_id: id},
            {$set: {content, title}},
            {new : true}
        )
    } catch (e) {
        const err = new Error('Post cannot be updated') as CustomError
        err.status = 400;
        next(err)
    }

    res.status(200).send(updatedPost);
})

export {router as updatePostRouter}