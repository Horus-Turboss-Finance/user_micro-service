import { ResponseException, middleware } from "packages";
import { NextFunction, Response } from "express";
import User from '../services/user/userModel';
import { existsSync, readFile, unlink } from "fs";
import Sharp from "sharp"
import path from "path";
import mime from "mime";

const { catchSync } = middleware;

export const imageFilter = catchSync(async (req : any, res : Response, next : NextFunction) => {
    if (!req.body.files) throw new ResponseException("Aucun fichier fournit.").BadRequest();

    const { avatar } = req.body.files ?? 0;
    let image: any = avatar; 

    if(!image) throw new ResponseException("Aucun avatar fournit").BadRequest()

    const extensionName = path.extname(image)
    const allowedExtension = ['.png','.jpg','.jpeg', '.gif'];

    let cheminApi = `${path.resolve("../files-tmp", image)}`;
    let type = mime.getType(cheminApi);

    if(!type) throw new ResponseException("Une erreur est survenue").UnknownError()
        
    if(!allowedExtension.includes(extensionName) || !type.startsWith('image')) throw new ResponseException("Invalid image type").BadRequest();

    image = `${req.userID}${path.parse(image).ext}`;

    if(!req.isValidToken) throw new ResponseException("Token invalide").InvalidToken();

    let chemin = `${path.resolve("pictures", image)}`;

    if(existsSync(chemin)){
        unlink(chemin, (err) => {(err? console.log(err) : "")})
    }

    readFile(cheminApi, (err, data) => {
        if(err) return next(err);

        Sharp(data, {
            animated : true,
            pages : -1
        })
        .resize(256, 256)
        .toFile(chemin, async (err, info) => {
            if(err) return next(err);

            const newUserData = {
                avatar : `${image}`
            }
    
            try{
                await User.findByIdAndUpdate(req.userID, newUserData, {
                    runValidators : true,
                    useFindAndModify : true
                })
    
                next(new ResponseException("Photo de profil bien mis à jour.").OK())
            }catch(e){
                next(e)
            }
        })
    });
})