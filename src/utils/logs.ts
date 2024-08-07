import * as fs from "fs"
import path from "path"
import { DateFormator, formatSelector} from 'dateformat';
import { Request } from "express";

export const loggeurReqErr = (req : Request, err : Error, type : string) => {
    const message = ` - ${type} ] "${req.method} ${req.originalUrl}" : \n\t${JSON.stringify(req.body)}\n\t${err.name}: ${err.message}\n`
    logProtocole(message)
}

export const loggeurServiceErr = (service : string, err : Error, type : string) => {
    const message = ` - ${type} ] "${service}" : \n\t${err.name}: ${err.message}\n`
    logProtocole(message)
}

export const loggeurInfo = (service : string, info : string, type : string) => {
    const message = ` - ${type} ] "${service}" : ${info}\n`
    logProtocole(message)
}

const logProtocole = (logMessage : string) => {
    const time = DateFormator(formatSelector.longTime)
    let today = DateFormator(formatSelector.shortDate)
    const arrToday = today.split('/')
    today = arrToday.reverse().join('.')

    const todayFileName = `${today}.log`

    const message = `[ ${time}`+ logMessage

    fs.writeFile(path.resolve('src', 'log', todayFileName), message, {flag : "a"}, (erro)=>{
        if(erro) console.log(erro)
    })
}

export const typeLog = {
    important : "IMPORTANT",
    caution : "CAUTION",
    warning : "WARNING",
    danger : "DANGER",
    note : "NOTE",
    info : "INFO"
}

export const serviceType = {
    mongoose : "MONGOOSE",
    app : "APP"
}