import { errorCode, SuccessCode } from "../config/types";

export const ResponseException = class ResponseException extends Error {
    status: number;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    reason: any;
    title: string;

    constructor(code = errorCode.UnknownError, reason = ""){
        super(code);
        this.status = 500;
        this.reason = reason;
        switch(code){
            case SuccessCode.Success : 
                this.title = 'SUCCESS';
                this.status = 200;
                break;
            case SuccessCode.OK :
                this.title = "OK";
                this.status = 201;
                break;
            case errorCode.NotFound :
                this.title = "NOT FOUND";
                this.status = 404;
                break;
            case errorCode.Forbidden :
                this.title = "FORBIDDEN";
                this.status = 403;
                break;
            case errorCode.IMATeapot :
                this.title = "I'M A TEAPOT";
                this.status = 418;
                break;
            case errorCode.BadRequest : 
                this.title = "BAD REQUEST";
                this.status = 400;
                break;
            case errorCode.Unauthorized :
                this.title = "UNAUTHORIZED",
                this.status = 401;
                break;
            case errorCode.ToManyRequest :
                this.title = "TO MANY REQUEST";
                this.status = 429;
                break;
            case errorCode.PaymentRequired : 
                this.title = "PAYMENT REQUIRED";
                this.status = 402;
                break;
            case errorCode.MethodNotAllowed :
                this.title = "METHOD NOT ALLOWED";
                this.status = 405;
                break;
            default :
                this.title = "INTERNAL SERVER ERROR";
                this.status = 500;
                break;
        }
    }

    send = () => {
        const success = this.status < 400;
        
        return {
            success : success,
            title : this.title,
            status : this.status,
            data : this.reason
        }
    }
}