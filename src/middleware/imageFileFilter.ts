import { ResponseException, middleware } from "packages";
import { NextFunction, Response } from "express";
import User from '../services/user/userModel';
import path from "path";
import fs from "fs";

const { catchSync } = middleware;

const testMimeType= (b64 : string) : boolean => {
    const signatures = {
        R0lGODdh: "image/gif",
        R0lGODlh: "image/gif",
        iVBORw0KGgo: "image/png",
        "/9j/": "image/jpg"
    };

    for (let s in signatures) {
        if (b64.indexOf(s) === 0) {
          return true;
        }
    }

    return false
}

export const imageFilter = catchSync(async (req : any, res : Response, next : NextFunction) => {
    if(!req.body.files) throw new ResponseException("Aucun fichier fournit.").BadRequest();

    const { avatar } = req.body.files ?? 0;
    if(!avatar[0]) throw new ResponseException("Structure de donnée mal formaté : Avatar isn't a Array of object.").BadRequest();
    const image: any = avatar[0]; 
    if(!image || !image.data || !image.name) throw new ResponseException("Aucun avatar fournit").BadRequest()

    const extensionName = path.extname(image.name)
    const allowedExtension = ['.png','.jpg', '.gif'];

    if(!allowedExtension.includes(extensionName) || !testMimeType(image.data)) throw new ResponseException("Invalid image type").BadRequest();

    image.name = `${req.userID}${path.parse(image.name).ext}`;

    if(!req.isValidToken) throw new ResponseException("Token invalide").InvalidToken();

    let chemin = `${path.resolve("pictures", image.name)}`
    if(fs.existsSync(chemin)){
        try{
            await fs.rmSync(chemin)
        }catch(e){
            console.log(e)
        }
    }

    fs.writeFile(image.name, image.data, "base64", async (e) => {
        if(e) return next(e);

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
    })
})