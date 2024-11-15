import path from 'path';
import bcrypt from "bcryptjs";
import { catchSync } from './catchAsync';
import User from '../services/user/userModel';
import { ResponseException, params} from "packages";
import { logSys, CE_Services } from "../config/log";
import { NextFunction, Request, Response } from 'express';

let { env, loadEnv } = params
env = loadEnv(path.resolve(__dirname, '../../../.env'))

let ipWhiteList = env.IP_SERVICE_WHITELIST.split(';')

export const controleOrigine = catchSync(async (req : Request, res : Response, next : NextFunction) => {
  if(env.NODE_ENV !== "PRODUCTION") return next()
  let socketAddr = req.socket ? req.socket.remoteAddress : req.ip
  let proxyAddrs = req.headers['host']

  let addr = [socketAddr].concat(proxyAddrs)

  let { trust } =  req.body;
  if(! trust) trust = req.headers.trust

  if(!addr.some(item => ipWhiteList.includes(item ?? "")) && (trust == env.PASSWORD_SERVICE)) {
    logSys.ServiceInfo(CE_Services.app, `User : "${addr[0] ?? "NOT FOUND"} try to use service registery`)
    throw new ResponseException("Vous n'êtes pas abilité à utiliser cette ressource.").Forbidden()
  }
  next()
})

export const isAuth = catchSync(async (req : any, res : Response, next : NextFunction) => {
  let { token } = req.body

  if(! token) token = req.headers.token

  console.log(token)
  let data;
  if(token) {
    data = await decodeToken(token);
  }else{
    data = {
      isValid : false,
      id : "0"
    }
  }

  if(!data.isValid) throw new ResponseException("Connection requise").Unauthorized();

  let user;
  if(`${req.baseUrl}`.includes("password")){
    user = await User.findById(data.id).select("+password");
  }else{
    user = await User.findById(data.id);
  }

  if(!user) throw new ResponseException("Connection requise").Unauthorized();

  req.user = user

  next();
})

let decodeToken = async (token : string) => {
  let noValid = {
    isValid : false,
    id : "0"
  }

  if(!token) return noValid;

  const tokenParts = token.split(".")
    
  const tokenFirstPart = tokenParts[0]; // {email, id}
  const tokenSecondPart = tokenParts[1]; // valid date
  let tokenEndPart = tokenParts[2];

  if(!tokenEndPart || !tokenSecondPart) return noValid;
  tokenEndPart = Buffer.from(`${tokenEndPart}`, 'base64url').toString('utf-8')

  const expireDate = parseInt(Buffer.from(`${tokenSecondPart}`, 'base64url').toString('utf-8'))

  const isValid = bcrypt.compareSync(`${tokenFirstPart}.${tokenSecondPart}.${env.PASSWORD_SERVICE}`, tokenEndPart) && expireDate > Date.now()


  if(!isValid) return noValid

  const userID = Buffer.from(`${tokenFirstPart}`, 'base64url').toString('utf-8')

  const data = {
      id : userID,
      isValid : true 
  }

  return data
}