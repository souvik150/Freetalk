import * as dotenv from 'dotenv';
import express, {NextFunction, Response, Request} from 'express'
import {json, urlencoded} from 'body-parser';
import mongoose from "mongoose";
import cors from "cors";
import cookieSession from "cookie-session";

import {
    newPostRouter,
    deletePostRouter,
    updatePostRouter,
    showPostRouter,
    newCommentRouter,
    deleteCommentRouter
} from './routers';
import {currentUser, requireAuth} from "../common";

dotenv.config();

const app = express()
app.use(cors({
    origin: "*",
    optionsSuccessStatus: 200
}))

app.set('trust proxy', true);

app.use(urlencoded({
    extended: false
}))

app.use(json())
app.use(cookieSession({
    signed: false,
    secure: false
}))

app.use(currentUser);

app.use(requireAuth ,newPostRouter)
app.use(requireAuth ,deletePostRouter)
app.use(requireAuth ,updatePostRouter)
app.use(requireAuth ,showPostRouter)

app.use(requireAuth ,newCommentRouter)
app.use(requireAuth ,deleteCommentRouter)

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
    if(!process.env.JWT_KEY) throw new Error('JWT_KEY is expected')

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


