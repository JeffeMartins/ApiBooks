import * as jwt from 'jsonwebtoken'
import authConfig from '../config/authConfig/index';
import {Response, Request, NextFunction} from "express";

class Authorization {
    public async authToken(req: Request, resp: Response, next: NextFunction) {
        const token = req.headers.authorization;

        if (!token) return resp.status(401).send({error: 'token not found'})

        jwt.verify(token, authConfig.secret, (err) => {
            if (err) return resp.status(401).send({error: 'access denied invalid token'})
            return next();
        })
        return;
    }
}

export default Authorization;