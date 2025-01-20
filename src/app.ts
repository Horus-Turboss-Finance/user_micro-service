import path from "path";
import express from "express";
import fileUpload from "express-fileupload";
import { connectDatabase } from "./config/db";
import userRouter from "./services/user/user.routes";
import { ResponseException, log, middleware, params } from "packages";

const app = express()

let { catchSync, ResponseProtocole } = middleware
let { serviceName, inAppServiceName, loadEnv, env } = params

/*
    CONFIGURATION
*/
env = loadEnv(path.resolve(__dirname, "../../.env"));

app.set("envLoad", env)
app.set("logSys", new log(serviceName.object.user, path.resolve("src", "log")))

app.disable("x-powered-by")
app.enable("json escalpe")

/*
    CONNECT DB
*/
connectDatabase(app)

/*
    MIDDLEWARE
*/
app.use(express.json())
app.use(express.urlencoded({
    extended: true,
}))
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
app.get('/ping', catchSync(async()=> {
    throw new ResponseException("Service en ligne").Success()
}));

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
    let logSys = app.get("logSys")

    if(!logSys) throw new Error("LogSys error : LogSys n'est pas monté");

    logSys.UnknowAppError(inAppServiceName.index, e)
});

export default app;