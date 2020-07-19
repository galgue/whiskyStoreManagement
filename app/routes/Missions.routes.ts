import { EntityRoute, RouteFactory } from './Route';
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
        ]
    }),
    uri: '/mission',
}