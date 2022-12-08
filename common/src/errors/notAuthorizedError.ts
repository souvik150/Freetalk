import {CustomError} from "./customError";

export class NotAuthorizedError extends CustomError {
    statusCode = 401;

    constructor() {
        super('not authorized');
    }

    generateErrors() {
        return [{message: 'not authorized'}];
    }
}