import { EntityRoute, RouteFactory } from './Route';
import { BerralType } from '../entity/BerralType';
import { Express } from 'express';

export const BerralTypesRoute: EntityRoute = {
    router: () => RouteFactory.createRoute(BerralType),
    uri: '/berral-type',
}