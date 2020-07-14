import { BerralType } from '../entity/BerralType';
import { Route } from './Route';
import { Express, Request, Response } from 'express';
import { getConnection } from "typeorm";

const GET_ALL_URI = '/berral-type/get';
const GET_URI = '/berral-type/get/:id';

export class BerralTypeRoute implements Route {

    initRoutes(app: Express) {

        app.get(GET_ALL_URI, (_: Request, res: Response): void => {
            getConnection().manager.find(BerralType).then(berralTypes => {
                res.send(berralTypes);
            })
        });

        app.get(GET_URI, (req: Request, res: Response): void => {
            getConnection().manager.findOne(BerralType, req.param('id')).then(berralType => {
                res.send(berralType);
            })
        });


    }



}