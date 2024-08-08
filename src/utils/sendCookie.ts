import { ResponseException } from "./responseException";
import { NextFunction, Response } from "express";
import { APPCRITIC } from "../config/envLoader";
import { SuccessCode } from "../config/types";


/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const sendTokenCookie = async (user : any, res : Response, next: NextFunction) => {
    const token = await user.generateToken();

    const options = {
        expires: new Date(
            Date.now() + APPCRITIC.TOKENEXPIRE + 36000
        ),
        httpOnly: true,
        sameSite: true
    }

    // // ⚠️⚠️ à mettre dans l'API GATEWAY ⚠️⚠️
    res.cookie('token', token, options)
    next(new ResponseException(SuccessCode.Success, JSON.stringify(user)))
};