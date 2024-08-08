import { ResponseException } from "../utils/responseException";
import { errorCode, SuccessCode, Request } from "../config/types";
import { NextFunction, Response } from "express";
import User from '../services/user/userModel';
import { catchSync } from "./catchAsync";
import { v4 as uuid } from "uuid";
import crypto from "crypto"
import path from "path";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const imageFilter = catchSync(async (req : Request, res : Response, next : NextFunction) => {
    if (!req.files) throw new ResponseException(errorCode.BadRequest, "Aucun fichier fournit.");

    const { avatar } = req.files;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const image: any = avatar; 
    if(!image) throw new ResponseException(errorCode.BadRequest, "Aucun avatar fournit")

    const extensionName = path.extname(image.name)
    const allowedExtension = ['.png','.jpg','.jpeg', '.gif'];

    if(!allowedExtension.includes(extensionName) || !image.mimetype.startsWith('image')) throw new ResponseException(errorCode.BadRequest, "Invalid image type");

    const hash = crypto.createHash('sha256')

    const datebase = (Date.now() - 1580511600000) / 1000
    const nameValid = `${parseInt(`${datebase}`)}.${uuid().slice(0, 4)}`

    hash.update(nameValid)

    const basename = hash.digest('base64url')

    image.name = `${basename}${path.parse(image.name).ext}`;
    image.mv(`${path.resolve("public/picture/user", image.name)}`, async (err: Error) => {
        if (err) return next(err)
  
        const newUserData = {
            avatar : `/avatars/${image.name}`
        }

        await User.findByIdAndUpdate(req.user._id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: true,
        });

        return next(new ResponseException(SuccessCode.OK, "Photo de profil bien mis à jour."))
    });
})