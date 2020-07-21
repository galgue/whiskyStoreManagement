import { EntityRoute, RouteFactory } from './Route';
import { ProssesChain } from '../entity/ProssesChain';

export const ProssesChainRoute: EntityRoute = {
    router: () => RouteFactory.createRoute(ProssesChain, {
        relations: ["prosses1", "prosses2", "prosses3", "prosses4"],
        deletePointerEntities: (entity) => {
            delete entity.prosses1;
            delete entity.prosses2;
            delete entity.prosses3;
            delete entity.prosses4;
            return entity
        }
    }),
    uri: '/prosses-chain',
}