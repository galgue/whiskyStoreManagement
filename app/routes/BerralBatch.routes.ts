import { BerralBatch } from '../entity/BerralBatch';
import { Route } from './Route';
import { Express, Request, Response } from 'express';
import { getConnection } from "typeorm";

const GET_ALL_URI = '/berral-batch/get';
const GET_URI = '/berral-batch/get/:id';

export class BerralBatchsRoute implements Route {

    initRoutes(app: Express) {

        app.get(GET_ALL_URI, (_: Request, res: Response): void => {
            getConnection().manager.find(BerralBatch, {
                relations: 
                [
                    "berralType",
                    "prossesChain", 
                    "prossesChain.prosses1",
                    "prossesChain.prosses2",
                    "prossesChain.prosses3",
                    "prossesChain.prosses4",
                ]
            })
            .then(berralBatchs => {
                res.send(berralBatchs);
            })
        });

        app.get(GET_URI, (req: Request, res: Response): void => {
            getConnection().manager.findOne(BerralBatch, req.param('id'), 
            {
                relations: 
                [
                    "berralType",
                    "prossesChain", 
                    "prossesChain.prosses1",
                    "prossesChain.prosses2",
                    "prossesChain.prosses3",
                    "prossesChain.prosses4",
                    "missions",
                    "notes",
                    "uses",
                ]
            })
            .then(berralBatch => {
                res.send(berralBatch);
            })
        });


    }



}