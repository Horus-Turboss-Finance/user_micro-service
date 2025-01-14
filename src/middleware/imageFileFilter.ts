import { ResponseException, middleware } from "packages";
import { NextFunction, Response } from "express";
import User from '../services/user/userModel';
import path from "path";
import fs from "fs";

const { catchSync } = middleware;

export const imageFilter = catchSync(async (req : any, res : Response, next : NextFunction) => {
    if (!req.files) throw new ResponseException("Aucun fichier fournit.").BadRequest();

    const { avatar } = req.files ?? 0;
    const image: any = avatar; 
    if(!image) throw new ResponseException("Aucun avatar fournit").BadRequest()

    const extensionName = path.extname(image.name)
    const allowedExtension = ['.png','.jpg','.jpeg', '.gif'];

    if(!allowedExtension.includes(extensionName) || !image.mimetype.startsWith('image')) throw new ResponseException("Invalid image type").BadRequest();

    image.name = `${req.userID}${path.parse(image.name).ext}`;

    if(!req.isValidToken) throw new ResponseException("Token invalide").InvalidToken();

    let chemin = `${path.resolve("picture", image.name)}`
    if(fs.existsSync(chemin)){
        try{
            await fs.rmSync(chemin)
        }catch(e){
            console.log(e)
        }
    }

    image.mv(chemin, async (err: Error) => {
        if (err) return next(err)
  
        const newUserData = {
            avatar : `${image.name}`
        }

        try{
            await User.findByIdAndUpdate(req.userID, newUserData, {
                runValidators: true,
                useFindAndModify: true,
            });
            
            next(new ResponseException("Photo de profil bien mis à jour.").OK())
        }catch(e){
            next(e)
        }
    });
})