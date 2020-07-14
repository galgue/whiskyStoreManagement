import { Route } from './Route';
import { Express, Request, Response } from 'express';
import { getConnection } from "typeorm";
import { Note } from '../entity/Notes';
import { Use } from '../entity/Uses';

const GET_ALL_URI = '/use/get';
const GET_URI = '/use/get/:id';

export class UsesRoute implements Route {

    initRoutes(app: Express) {

        app.get(GET_ALL_URI, (_: Request, res: Response): void => {
            getConnection().manager.find(Use, {
                relations: 
                [
                    "berralBatch",
                    "creator",
                    "berralBatch.berralType",
                    "berralBatch.prossesChain",
                    "berralBatch.prossesChain.prosses1",
                    "berralBatch.prossesChain.prosses2",
                    "berralBatch.prossesChain.prosses3",
                    "berralBatch.prossesChain.prosses4",
                ]
            })
            .then(uses => {
                res.send(uses);
            })
        });

        app.get(GET_URI, (req: Request, res: Response): void => {
            getConnection().manager.findOne(Use, req.param('id'), 
            {
                relations: 
                [
                    "berralBatch",
                    "creator",
                    "berralBatch.berralType",
                    "berralBatch.prossesChain",
                    "berralBatch.prossesChain.prosses1",
                    "berralBatch.prossesChain.prosses2",
                    "berralBatch.prossesChain.prosses3",
                    "berralBatch.prossesChain.prosses4",
                ]
            })
            .then(use => {
                res.send(use);
            })
        });


    }



}