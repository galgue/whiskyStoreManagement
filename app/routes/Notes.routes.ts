import { EntityRoute, RouteFactory } from './Route';
import { Express } from 'express';
import { Note } from '../entity/Notes';

export const NotesRoute: EntityRoute = {
    router: () => RouteFactory.createRoute(Note, {
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
    uri: '/note',
}