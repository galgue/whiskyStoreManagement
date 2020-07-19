import { EntityRoute, RouteFactory } from './Route';
import { ProssesChain } from '../entity/ProssesChain';

export const ProssesChainRoute: EntityRoute = {
    router: () => RouteFactory.createRoute(ProssesChain, {
        relations: ["prosses1", "prosses2", "prosses3", "prosses4"]
    }),
    uri: '/prosses-chain',
}