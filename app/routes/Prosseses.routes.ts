import { Prosses } from '../entity/Prosses';
import { BerralType } from '../entity/BerralType';
import { Route } from './Route';
import { Express, Request, Response } from 'express';
import { getConnection } from "typeorm";

const GET_ALL_URI = '/prosseses/get';
const GET_URI = '/prosseses/get/:id';

export class ProssesRoute implements Route {

    initRoutes(app: Express) {

        app.get(GET_ALL_URI, (_: Request, res: Response): void => {
            getConnection().manager.find(Prosses, {relations: ["berralType"]}).then(prosseses => {
                res.send(prosseses);
            })
        });

        app.get(GET_URI, (req: Request, res: Response): void => {
            getConnection().manager.findOne(Prosses, req.param('id'), {relations: ["berralType"]})
            .then(prosses => {
                res.send(prosses);
            })
        });


    }



}