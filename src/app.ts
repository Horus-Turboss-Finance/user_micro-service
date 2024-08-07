import express from "express";
import cookieParse from "cookie-parser";
import { errorCode } from "./config/types";
import fileUpload from "express-fileupload";
import { APPCRITIC } from "./config/envLoader";
import userRouter from "./services/user/user.routes";
import { ResponseProtocole } from "./middleware/response";
import { ResponseException } from "./utils/responseException";

import { connectDatabase } from "./config/db"
import path from "path";
import { catchSync } from "./middleware/catchAsync";

const app = express()

/*
CONNECT DB
*/

connectDatabase()

/*
MIDDLEWARE
*/

app.use(express.json())
app.use(cookieParse(APPCRITIC.SECRETCOOKIES))
app.use(fileUpload({
    createParentPath: true,
    abortOnLimit : true,
    limitHandler : (req, res, next) => {
        next(new ResponseException(errorCode.BadRequest, "Fichier trop volumineux."))
    },
    parseNested : true,
    limits : { 
        fileSize : 1024*1024*9,
    },
}))

/*
API USER SERVICE
*/

app.use("/", userRouter)

const UserAvatar = express.static(path.resolve('public', 'picture', 'user'))
const DefaultAvatar = express.static(path.resolve('public', 'picture', 'default'))

app.use('/avatars', UserAvatar)
app.use('/avatars', DefaultAvatar)

/*
ERROR 404
*/

app.use('*', catchSync(async() => {
    throw new ResponseException(errorCode.NotFound, "Chemin ou méthodes non supporté.")
}))

/*
ERROR HANDLER
*/

app.use(ResponseProtocole);

export default app;