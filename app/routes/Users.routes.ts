import { User } from '../entity/User';
import { Route } from './Route';
import { Express, Request, Response } from 'express';
import { getConnection } from "typeorm";
import {sign} from 'jsonwebtoken';

const GET_ALL_URI = '/users/get';
const GET_URI = '/users/get/:id';
const SIGNUP_URI = '/users/signup'

export class UsersRoutes implements Route {

    initRoutes(app: Express) {

        app.get(GET_ALL_URI, (_: Request, res: Response): void => {
            getConnection().manager.find(User).then(users => {
                res.send(users);
            })
        });

        app.get(GET_URI, (req: Request, res: Response): void => {
            getConnection().manager.findOne(User, req.param('id')).then(user => {
                res.send(user);
            })
        });

        app.post(SIGNUP_URI, (req: Request, res: Response): void => {
            let newUser: User = req.body as User;

            if (newUser.password.length !== 0){
                newUser.password = sign(newUser.password, 'drinkme');
            }

            getConnection().manager.create(User, newUser);

        });
    }



}