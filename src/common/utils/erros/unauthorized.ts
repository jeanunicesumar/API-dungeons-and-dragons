import { StatusCode } from "src/common/enum/statusCode";
import { ApiError } from "./apiError";

export class UnauthorizedError extends ApiError {

    constructor(message: string, status: StatusCode){
        super(message, status)
    }
}