import { EntityRoute, RouteFactory } from './RouteFactory';
import { Mission } from './../entity/Mission';
import { Express } from 'express';

export const MissionsRoute: EntityRoute = {
    router: () => RouteFactory.createRoute(Mission, {
        relations: [
            "berralBatch",
            "creator",
            "executeBy",
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
            delete entity.executeBy;
            return entity
        }
    }),
    uri: '/mission',
}