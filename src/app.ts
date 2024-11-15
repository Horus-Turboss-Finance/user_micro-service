import path from "path";
import express from "express";
import fileUpload from "express-fileupload";
import { ResponseException } from "packages";
import { connectDatabase } from "./config/db";
import { CE_Services, logSys } from "./config/log";
import { catchSync } from "./middleware/catchAsync";
import userRouter from "./services/user/user.routes";
import { ResponseProtocole } from "./middleware/response";

const app = express()

/*
CONNECT DB
*/

connectDatabase()

/*
MIDDLEWARE
*/

app.use(express.json())
app.use(fileUpload({
    createParentPath: true,
    abortOnLimit : true,
    limitHandler : (req, res, next) => {
        next(new ResponseException("Fichier trop volumineux.").BadRequest())
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

app.use("/avatars", express.static(path.resolve('./picture/default')))
app.use("/avatars", express.static(path.resolve('./picture/user')))

/*
ERROR 404
*/

app.use('*', catchSync(async() => {
    throw new ResponseException("Chemin ou méthodes non supporté.").NotFound()
}))

/*
ERROR HANDLER
*/

app.use(ResponseProtocole);

/*
    CRITIC LOGS
*/
process.on("uncaughtException", (e) => {
    console.log(e)
    logSys.UnknowAppError(CE_Services.index, e)
});

export default app;