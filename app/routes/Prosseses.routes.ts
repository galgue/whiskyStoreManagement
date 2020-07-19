import { EntityRoute, RouteFactory } from './Route';
import { Prosses } from '../entity/Prosses';
import { Express } from 'express';

export const ProssesRoute: EntityRoute = {
    router: () => RouteFactory.createRoute(Prosses, {
        relations: ["berralType"]
    }),
    uri: '/prosses',
}