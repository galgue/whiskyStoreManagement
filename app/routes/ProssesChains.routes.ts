import { ProssesChain } from '../entity/ProssesChain';
import { Route } from './Route';
import { Express, Request, Response } from 'express';
import { getConnection } from "typeorm";

const GET_ALL_URI = '/prossese-chain/get';
const GET_URI = '/prossese-chain/get/:id';

export class ProssesChainRoutes implements Route {

    initRoutes(app: Express) {
        app.get(GET_ALL_URI, (_: Request, res: Response): void => {
            getConnection().manager.find(ProssesChain,
                {
                    relations: ["prosses1", "prosses2", "prosses3", "prosses4"]
                })
                .then(prosseseChains => {
                    res.send(prosseseChains);
                })
        });

        app.get(GET_URI, (req: Request, res: Response): void => {
            app.get(GET_ALL_URI, (_: Request, res: Response): void => {
                getConnection().manager.findOne(ProssesChain, req.param('id'),
                    {
                        relations: ["prosses1", "prosses2", "prosses3", "prosses4"]
                    })
                    .then(prosseseChains => {
                        res.send(prosseseChains);
                    })
            });
        })
    }
}