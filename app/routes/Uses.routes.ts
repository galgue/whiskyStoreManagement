import { EntityRoute, RouteFactory } from './RouteFactory';
import { Express, Request, Response } from 'express';
import { getConnection } from "typeorm";
import { Use } from '../entity/Uses';

export const UsesRoute: EntityRoute = {
    router: () => RouteFactory.createRoute(Use, {
        relations: [
            "berralBatch",
            "creator",
            "berralBatch.berralType",
            "berralBatch.prossesChain",
            "berralBatch.prossesChain.prosses1",
            "berralBatch.prossesChain.prosses2",
            "berralBatch.prossesChain.prosses3",
            "berralBatch.prossesChain.prosses4",
        ],
        deletePointerEntities: (entity) => {
            delete entity.berralBatch;
            delete entity.creator;
            return entity
        }
    }),
    uri: '/use',
}