import { Mission } from './../entity/Mission';
import { BerralBatch } from '../entity/BerralBatch';
import { Route } from './Route';
import { Express, Request, Response } from 'express';
import { getConnection } from "typeorm";

const GET_ALL_URI = '/mission/get';
const GET_URI = '/mission/get/:id';

export class MissionsRoute implements Route {

    initRoutes(app: Express) {

        app.get(GET_ALL_URI, (_: Request, res: Response): void => {
            getConnection().manager.find(Mission, {
                relations: 
                [
                    "berralBatch",
                    "creator",
                    "executeBy",
                    "berralBatch.berralType",
                    "berralBatch.prossesChain",
                    "berralBatch.prossesChain.prosses1",
                    "berralBatch.prossesChain.prosses2",
                    "berralBatch.prossesChain.prosses3",
                    "berralBatch.prossesChain.prosses4",
                ]
            })
            .then(missions => {
                res.send(missions);
            })
        });

        app.get(GET_URI, (req: Request, res: Response): void => {
            getConnection().manager.findOne(Mission, req.param('id'), 
            {
                relations: 
                [
                    "berralBatch",
                    "creator",
                    "executeBy",
                    "berralBatch.berralType",
                    "berralBatch.prossesChain",
                    "berralBatch.prossesChain.prosses1",
                    "berralBatch.prossesChain.prosses2",
                    "berralBatch.prossesChain.prosses3",
                    "berralBatch.prossesChain.prosses4",
                ]
            })
            .then(mission => {
                res.send(mission);
            })
        });


    }



}