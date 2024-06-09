import { StatusCode } from "src/common/enum/statusCode";

export interface IError {

    message: string
    status: StatusCode
}