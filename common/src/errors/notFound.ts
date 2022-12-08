import {CustomError} from "./customError";

export class NotFoundError extends CustomError {
    statusCode = 404;

    constructor() {
        super('not found');
    }

    generateErrors(){
        return [{message: 'not found'}];
    }
}