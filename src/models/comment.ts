import mongoose from 'mongoose'

export interface CommentDoc extends mongoose.Document {
    userName: string,
    content: string
}

export interface CreateCommentDto {
    userName: string,
    content: string
}

export interface CommentModel extends mongoose.Model<CommentModel>{
    build(dto: CreateCommentDto): CommentDoc
}

const commentSchema = new mongoose.Schema({
    userName: {
        type: String,
    },
    content: {
        type: String,
        required: true
    }
})

commentSchema.statics.build = (createCommentDto: CreateCommentDto) => {
    return new Comment(createCommentDto);
}

export const Comment = mongoose.model<CommentDoc, CommentModel>('Comment', commentSchema)