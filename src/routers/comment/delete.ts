import {Router, Request, Response, NextFunction} from "express";
import Post from "../../models/post";
import Comment from "../../models/comment";

const router = Router();

router.delete('/api/comment/:commentId/delete/:postId', async (req: Request, res: Response, next: NextFunction) => {
    const {commentId, postId} = req.params;

    if(!commentId || !postId) {
        const error = new Error('Post id and Comment id are both required') as CustomError;
        error.status = 400;
        next(error);
    }

    try {
        await Post.findOneAndRemove({
            _id: commentId
        })
    } catch(error) {
        next(new Error('Comment cannot be updated'));
    }

    await Post.findOneAndUpdate(
        {_id: postId},
        {$pull: {comments: commentId}},
    )

    res.status(200).json({success: true})
})

export {router as deleteCommentRouter}