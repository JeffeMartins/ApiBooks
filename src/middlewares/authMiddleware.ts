import * as jwt from 'jsonwebtoken';import authConfig from '../config/authConfig';import {Response,Request,NextFunction} from 'express';
export default class Authorization {
 public authToken(req:Request,res:Response,next:NextFunction){
  const header=req.headers.authorization;const token=header?.startsWith('Bearer ') ? header.slice(7) : header;
  if(!token)return res.status(401).json({error:'token not found'});
  try {const claims=jwt.verify(token,authConfig.secret,{algorithms:['HS256']});if(typeof claims==='string' || !claims.sub)return res.status(401).json({error:'invalid identity'});
   if(req.path==='/getAllUser')return res.status(403).json({error:'Listing all users is disabled'});
   if(['/updateUser','/deleteUser','/findUser'].includes(req.path) && req.body?.email!==claims.sub)return res.status(403).json({error:'Only your own user record is accessible'});
   return next();
  }catch{return res.status(401).json({error:'invalid token'});}
 }
}
