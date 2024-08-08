import express from 'express';
import { Model } from "mongoose";
import * as core from 'express-serve-static-core';

export interface dbconf {
    URLDB : string,
    NAME : string
}

export interface appCritic {
    EMAILAPIPRIVATEKEY : string,
    EMAILPUBLICADRESS : string,
    TOKENSIGNATURE : string,
    SECRETCOOKIES : string,
    TOKENEXPIRE : number,
    URLAPP : string,
    PORT : number,
}

export interface IUser {
    _id: string;
    bio?: string;
    email: string;
    avatar?: string;
    username: string;
    password: string;
    followers?: [string];
    following?: [string];
    resetPassword?: string;
    resetPasswordExpiry?: number;
    refreshPasswordLastUse?: number;
}

export interface IUserMethods extends Model<IUser> {
    comparePassword(enteredPassword: string): Promise<boolean>;
    generateToken(): Promise<string>;
    getResetPassword(): Promise<string>;
}

export interface RespExcept {
    status : number;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    reason : any;  
    title : string;
    send () : object
}

export const errorCode = {
    NotFound : "NotFound", /* 404 */
    Forbidden : "Forbidden", /* 403 */
    IMATeapot : "IMATeapot", /* 418 */
    BadRequest : "BadRequest", /* 400 */
    Unauthorized : "Unauthorized", /* 401 */
    UnknownError : "UnknownError", /* 500 */
    ToManyRequest : "ToManyRequest", /* 429 */
    PaymentRequired : "PaymentRequired", /* 402 */
    MethodNotAllowed : "MethodNotAllowed", /* 405 */
}

export const SuccessCode = {
    Success : "Success", /* 200 */
    OK : "OK" /* 201 */
}

export interface UserModel extends Model<IUser, Record<string, never>, IUserMethods> {
    decodeToken(token: string): Promise<tokenData>;
}

export const EmailType = {
    ForgotPassword : "FORGOTPASSWORD",
}

export interface tokenData {
    isValid : boolean,
    id : string,
}

export interface Query extends core.Query { }

export interface Params extends core.ParamsDictionary { }

export interface Request
    <   
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        ReqBody = any, 
        ReqQuery = Query, 
        URLParams extends Params = core.ParamsDictionary
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    > extends express.Request<URLParams, any, ReqBody, ReqQuery> {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        user: any,
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        cookies : any
}