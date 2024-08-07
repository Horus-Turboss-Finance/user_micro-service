import { catchSync } from './catchAsync';
import User from '../services/user/userModel';
import { NextFunction, Response } from 'express';
import { ResponseException } from '../utils/responseException';
import { errorCode, Request } from '../config/types';

export const isAuth = catchSync(async (req : Request, res : Response, next : NextFunction) => {
  let { token } = req.cookies;

  if(!token) token = req.body.token;

  let data;
  if(token) {
    data = await User.decodeToken(token);
  }else{
    data = {
      isValid : false,
      id : "0"
    }
  }

  if(!data.isValid) throw new ResponseException(errorCode.Unauthorized, "Connection requise");

  const user = await User.findById(data.id);

  if(!user) throw new ResponseException(errorCode.Unauthorized, "Connection requise");

  req.user = user

  next();
})