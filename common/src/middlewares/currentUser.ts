import {NextFunction, Request, Response} from "express";
import jwt from 'jsonwebtoken';

declare global {
    interface JwtPayload {
        email: string,
        userId: string
    }

    namespace Express {
        interface Request {
            currentUser?: JwtPayload
        }
    }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    if(!req.session?.jwt){
        return next()
    }

    try {
        req.currentUser = jwt.verify(req.session?.jwt, process.env.JWT_KEY!) as JwtPayload;

    } catch(err) {
        return next(err)
    }

    next()
}