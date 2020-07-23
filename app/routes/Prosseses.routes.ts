import { EntityRoute, RouteFactory } from './RouteFactory';
import { Prosses } from '../entity/Prosses';
import { Express } from 'express';

export const ProssesRoute: EntityRoute = {
    router: () => RouteFactory.createRoute(Prosses, {
        relations: ["berralType"],
        deletePointerEntities: (entity) => {
            delete entity.berralType;
            return entity
        }
    }),
    uri: '/prosses',
}