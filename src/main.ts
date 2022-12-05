import * as dotenv from 'dotenv';
import express, {NextFunction, Response, Request} from 'express'
import {json, urlencoded} from 'body-parser';
import mongoose from "mongoose";
import cors from "cors";

import {
    newPostRouter,
    deletePostRouter,
    updatePostRouter,
    showPostRouter,
    newCommentRouter,
    deleteCommentRouter
} from './routers';

dotenv.config();

const app = express()
app.use(cors({
    origin: "*",
    optionsSuccessStatus: 200
}))

app.use(urlencoded({
    extended: false
}))

app.use(json())

app.use(newPostRouter)
app.use(deletePostRouter)
app.use(updatePostRouter)
app.use(showPostRouter)

app.use(newCommentRouter)
app.use(deleteCommentRouter)

app.all('*', (req,res,next) => {
    const error = new Error('not found!') as CustomError;
    error.status = 404
    next(error)
})

declare global {
    interface CustomError extends Error {
        status?: number
    }
}

app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
    if(error.status) {
        return res.status(error.status).json({message: error.message});
    }

    res.status(500).json({message: 'Something went wrong'});
})

const start = async () => {
    if(!process.env.MONGO_URI) throw new Error('MONGO_URI is expected')

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.info('Connected to DB successfully')
    }
    catch(err){
        throw new Error(`DB Error!`)
    }

    app.listen(8080, () => console.info('Server is running on port 8080 '))
}

start()


