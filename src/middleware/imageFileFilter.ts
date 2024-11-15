import { NextFunction, Response } from "express";
import User from '../services/user/userModel';
import { ResponseException } from "packages";
import { catchSync } from "./catchAsync";
import path from "path";

export const imageFilter = catchSync(async (req : any, res : Response, next : NextFunction) => {
    if (!req.files) throw new ResponseException("Aucun fichier fournit.").BadRequest();

    const { avatar } = req.files;
    const image: any = avatar; 
    if(!image) throw new ResponseException("Aucun avatar fournit").BadRequest()

    const extensionName = path.extname(image.name)
    const allowedExtension = ['.png','.jpg','.jpeg', '.gif'];

    if(!allowedExtension.includes(extensionName) || !image.mimetype.startsWith('image')) throw new ResponseException("Invalid image type").BadRequest();

    const datebase = (Date.now() - 1580511600000) / 1000
    const nameValid = `${parseInt(`${datebase}`)}.${Math.floor(Math.random() * 999999999)}`

    image.name = `${nameValid}${path.parse(image.name).ext}`;
    image.mv(`${path.resolve("picture/user", image.name)}`, async (err: Error) => {
        if (err) return next(err)
  
        const newUserData = {
            avatar : `/avatars/${image.name}`
        }

        try{
            await User.findByIdAndUpdate(req.user._id, newUserData, {
                new: true,
                runValidators: true,
                useFindAndModify: true,
            });
        }catch(e){
            next(e)
        }

        return next(new ResponseException("Photo de profil bien mis à jour.").OK())
    });
})