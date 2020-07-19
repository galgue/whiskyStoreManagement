import { User } from './../../entity/User';
import { Request, Response, NextFunction } from 'express';
import { getConnection } from "typeorm";
import { verify } from 'jsonwebtoken';

export function auth(req: Request, res: Response, next: NextFunction) {
    if(req.cookies?.session){
        let {email, password} = 
            verify(req.cookies.session, 'drinkme') as {email: string, password: string};
        getConnection().manager.count(User, { where: { 
            "email": email,
            "password": password,
            } }).then(numberOfUsers => {
                if(!!numberOfUsers){
                    next();
                }
            })
    }
    res.send('unauthorized');
}