import {Router, Request, Response, NextFunction} from "express";
import {Post} from "../../models/post";
import {BadRequestError} from "../../../common";

const router = Router();

router.delete('/api/post/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;

    if(!id) {
        return next(new BadRequestError('Post id is required'))
    }

    try {
        await Post.findOneAndRemove({
            _id: id
        })
    } catch(error) {
        next(new Error('Post cannot be updated'));
    }

    res.status(200).json({success: true})
})

export {router as deletePostRouter}