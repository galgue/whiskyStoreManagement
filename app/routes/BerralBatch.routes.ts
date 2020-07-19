import { EntityRoute, RouteFactory } from './Route';
import { BerralBatch } from '../entity/BerralBatch';
import { Express } from 'express';

export const BerralBatchsRoute: EntityRoute = {
    router: () => RouteFactory.createRoute(BerralBatch, {
        relations: [
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
    }),
    uri: '/berral-batch',
}