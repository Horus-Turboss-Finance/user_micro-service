import path from "path";
import { log, params } from "packages"
import { Request, Response, NextFunction } from "express"

export const logSys = new log(params.serviceName.object.utilisateur, path.resolve("src", "log"))
export const CE_Services = params.inAppServiceName
export const LogRequest = (req : Request, res : Response, next : NextFunction) => {
  const text = `${req.method} : ${req.baseUrl} | body : ${req.body} ; header : ${req.headers} | query : ${req.query}`
  logSys.ServiceInfo(params.inAppServiceName.app, text)
}