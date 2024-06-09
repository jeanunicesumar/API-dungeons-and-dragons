import { StatusCode } from "src/common/enum/statusCode";
import { IError } from "src/crud/interfaces/error";

export class ApiError extends Error implements IError {

    readonly status: StatusCode

    constructor(message: string, statusCode: StatusCode) {
        super(message)
        this.status = statusCode
    }

    get statusCode(): StatusCode {
        return this.status
    }

}