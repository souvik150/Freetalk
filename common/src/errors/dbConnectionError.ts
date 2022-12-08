import {CustomError} from "./customError";

export class DatabaseConnectionError extends CustomError{
    statusCode = 500;

    constructor() {
        super('db connection error');
    }

    generateErrors() {
        return [{message : 'db connection error'}];
    }
}