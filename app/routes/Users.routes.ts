import { EntityRoute } from './Route';
import { User } from '../entity/User';
import { Request, Response, Router } from 'express';
import { getConnection } from "typeorm";
import { sign } from 'jsonwebtoken';
import { auth } from './middleware/auth.middleware';

const GET_ALL_URI = '/get';
const GET_URI = '/get/:id';
const SIGNUP_URI = '/signup';
const LOGIN_URI = '/login';

export const UsersRoute: EntityRoute = {

    uri: '/users',

    router: () => {

        let router = Router();

        router.get(GET_ALL_URI, (_: Request, res: Response): void => {
            getConnection().manager.find(User).then(users => {
                res.send(users);
            })
        });

        router.get(GET_URI, (req: Request, res: Response): void => {
            getConnection().manager.findOne(User, req.param('id')).then(user => {
                res.send(user);
            })
        });

        router.post(SIGNUP_URI, (req: Request, res: Response): void => {
            let newUser: User = req.body.user as User;

            if (newUser.password.length !== 0){
                newUser.password = sign(newUser.password, 'drinkme');
            }

            getConnection().manager.save(User, newUser).then(newUser => {
                res.send(newUser);
            }).catch(err => {
                switch (err.code) { 
                    case 'ER_DUP_ENTRY':
                       res.send("deplicate Email");
                  }
            })
        });

        router.post(LOGIN_URI, (req: Request, res: Response): void => {
            let email: String = req.body.email;
            let password: String = req.body.password;
            
            if (password.length !== 0){
                password = sign(password, 'drinkme');
            }

            getConnection().manager.count(User, { where: { 
                "email": email,
                "password": password,
             } }).then(numberOfUsers => {
                 if(!!numberOfUsers){
                    res.cookie(
                        'session',sign({email, password}, 'drinkme'), 
                        { maxAge: 900000, httpOnly: true }
                        );
                    res.send(true);
                 }
                 res.send(false);
             })
             .catch(() => {
                res.send(false);
             })
        });

        return router;
    },
}