import { NextFunction, Request, Response } from "express"
import { loggeurReqErr, typeLog } from "../utils/logs"
import { ResponseException } from "../utils/responseException"
import { RespExcept } from "../config/types"

export const ResponseProtocole = (err : Error & RespExcept, req : Request, res : Response, next : NextFunction) => {
    const logErr = err
    if(!('status' in err)){
        err = new ResponseException()
    }
    
    if(err.status == 403){
        const errorLog = new Error(err.reason)
        errorLog.name = `${err.status} ${err.title}`
        loggeurReqErr(req, errorLog, typeLog.note)
    }

    if(err.status >= 500){
        loggeurReqErr(req, logErr, typeLog.danger)
    }

    return res.status(err.status).json(err.send())
    next()
}