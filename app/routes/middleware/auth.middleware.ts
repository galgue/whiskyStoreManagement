import { User } from './../../entity/User';
import { Request, Response, NextFunction } from 'express';
import { getConnection } from "typeorm";
import { verify } from 'jsonwebtoken';

export function auth(req: Request, res: Response, next: NextFunction) {
    if(req.cookies?.session){
        let {email, password} = 
            verify(req.cookies.session, 'drinkme') as {email: string, password: string};

        if(email === 'admin' && password === 'admin'){
            next();
        }
        getConnection().manager.count(User, { where: { 
            "email": email,
            "password": password,
            } }).then(numberOfUsers => {
                if(!!numberOfUsers){
                    next();
                } else {
                    res.send('unauthorized');
                }
            })
    } else {
        res.send('unauthorized');
    }
}

export function authManager(req: Request, res: Response, next: NextFunction) {
    if(req.cookies?.session){
        let {email, password} = 
            verify(req.cookies.session, 'drinkme') as {email: string, password: string};

        if(email === 'admin' && password === 'admin'){
            next();
        }
        getConnection().manager.count(User, { where: { 
            "email": email,
            "password": password,
            "isManager": true,
            } }).then(numberOfUsers => {
                if(!!numberOfUsers){
                    next();
                } else {
                    res.send('unauthorized');
                }
            })
    } else {
        res.send('unauthorized');
    }
}