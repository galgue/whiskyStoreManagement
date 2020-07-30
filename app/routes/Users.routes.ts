import { EntityRoute } from './RouteFactory';
import { User, adminUser } from '../entity/User';
import { Request, Response, Router } from 'express';
import { getConnection } from "typeorm";
import { sign, verify } from 'jsonwebtoken';
import { auth, authManager } from './middleware/auth.middleware';

const GET_ALL_URI = '/get';
const GET_URI = '/get/:id';
const SIGNUP_URI = '/add';
const LOGIN_URI = '/login';
const IS_LOGGED_URI = '/islogged';
const LOGOUT_URI = '/logout';

export const UsersRoute: EntityRoute = {

    uri: '/users',

    router: () => {

        let router = Router();

        router.get(GET_ALL_URI, authManager, (_: Request, res: Response): void => {
            getConnection().manager.find(User).then(users => {
                res.send(users);
            })
        });

        router.get(GET_URI, authManager, (req: Request, res: Response): void => {
            getConnection().manager.findOne(User, req.param('id')).then(user => {
                res.send(user);
            })
        });

        router.post(SIGNUP_URI,  authManager, (req: Request, res: Response, next): void => {
            let newUser: User = req.body.entity as User;

            if (newUser.password.length !== 0){
                newUser.password = sign(newUser.password, 'drinkme');
            }

            getConnection().manager.save(User, newUser).then(newUser => {
                res.send(newUser);
            }).catch(err => {
                next(err);
            })
        });

        router.post('/update', authManager, function (req, res, next) {
            let editUser: User = req.body.entity as User;

            if (editUser.password && editUser.password.length !== 0){
                editUser.password = sign(editUser.password, 'drinkme');
            } else {
                delete editUser.password;
            }

            getConnection().manager.save(User, editUser)
            .then(result => {
                res.send(result);
            }).catch(err => {
                next(err);
            })
        });

        const getUser = (userEmail: string) => {
            return getConnection().manager.findOne(User, {where: {email: userEmail}}).then(user => {
                return {userName: `${user.firstName} ${user.lastName}`, isManager: user.isManager}
            })
        }

        router.post(LOGIN_URI, (req: Request, res: Response): void => {
            let email: string = req.body.email;
            let password: string = req.body.password;

            if(email === 'admin' && password === 'admin'){
                res.cookie(
                    'session',sign({email, password}, 'drinkme'), 
                    { maxAge: 90000000, httpOnly: true }
                    );
                res.send(adminUser);
            }
            
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
                        { maxAge: 900000000, httpOnly: true }
                        );
                    getUser(email).then(userInfo => {
                        res.send(userInfo);
                    })
                 } else {
                    res.send(undefined);
                 }
             })
             .catch(() => {
                res.send(undefined);
             })
        });

        router.post(IS_LOGGED_URI, (req: Request, res: Response): void => {
            try {
                if(req.cookies?.session) {
                    const {email, password}:{email: string, password: string}  = 
                        verify(req.cookies?.session, 'drinkme') as {email: string, password: string};

                    if(email === 'admin' && password === 'admin'){
                        res.send(adminUser);
                    }

                    getConnection().manager.count(User, { where: { 
                        "email": email,
                        "password": password,
                        } }).then(numberOfUsers => {
                            if(!!numberOfUsers){
                                getUser(email).then(userInfo => {
                                    res.send(userInfo);
                               })
                            } else {
                                res.send(undefined);
                            }
                        })
                        .catch(() => {
                        res.send(undefined);
                        })
                } else {
                    res.send(undefined);
                }
            } catch {
                res.send(undefined);
            }
        });

        router.post(LOGOUT_URI, (req: Request, res: Response): void => {
            res.clearCookie('session');
            res.sendStatus(200);
        });

        router.post('/delete', authManager, function (req, res, next) {
            getConnection().manager.delete(User, req.body.entity.id)
            .then(result => {
                res.send(result);
            }).catch(err => {
                next(err);
            })
        });

        return router;
    },
}