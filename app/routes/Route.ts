import { Express, Router } from "express";
import { getConnection, ObjectType } from "typeorm";
import { Request, Response } from 'express';
import { auth } from './middleware/auth.middleware';

interface optionsProps<T> {
    relations?: string[],
    isAuthNeeded?: boolean,
    deletePointerEntities?: (entity: T) => T,
}

export interface EntityRoute {
    uri: string,
    router: () => Router,
}

export let RouteFactory  = {

    createRoute<T>(
        objectType: ObjectType<T>, 
        options: optionsProps<T> = {
            relations: [], 
            isAuthNeeded: false, 
            deletePointerEntities: (entity: T) => entity},
        ): Router {
        let {relations, isAuthNeeded} = options;    
        let router = Router();

        if(isAuthNeeded) {
            router.use(auth);
        }

        router.get('/', function(_,res) {
            res.send(objectType);
        });

        router.get('/get', function (_, res, next) {
            getConnection().manager.find(objectType, 
                { relations: options.relations })
                .then(results => {
                res.send(results);
            }).catch(err => {
                next(err);
            })
        });

        router.get('/get/:id', function (req, res, next) {
            getConnection().manager.findOne(objectType, req.param('id'), 
                { relations })
            .then(result => {
                res.send(result);
            }).catch(err => {
                next(err);
            })
        });

        router.post('/delete', function (req, res, next) {
            getConnection().manager.delete(objectType, req.body.entity.id)
            .then(result => {
                res.send(result);
            }).catch(err => {
                next(err);
            })
        });

        router.post('/add', function (req, res, next) {
            getConnection().manager.save(objectType, options.deletePointerEntities(req.body.entity))
            .then(result => {
                res.send(result);
            }).catch(err => {
                next(err);
            })
        });

        router.post('/update', function (req, res, next) {
            getConnection().manager.save(objectType, options.deletePointerEntities(req.body.entity))
            .then(result => {
                res.send(result);
            }).catch(err => {
                next(err);
            })
        });


        return router;
    },

    addNew<T>(req: Request, res: Response): void {
        let newEntity: T = req.body.entity as T;

        getConnection().manager.save(newEntity).then(AddedEntity => {
            res.send(AddedEntity);
        }).catch(err => {
            switch (err.code) { 
                case 'ER_DUP_ENTRY':
                    res.send("deplicate Email");
                }
        })
    },

    usdate<T>(req: Request, res: Response): void {
        let updateEntity: T = req.body.entity as T;

        getConnection().manager.save(updateEntity).then(AddedEntity => {
            res.send(AddedEntity);
        }).catch(err => {
            switch (err.code) { 
                case 'ER_DUP_ENTRY':
                    res.send("deplicate");
                }
        })
    },

    delete<T>(req: Request, res: Response): void {
        let entity: T = req.body.entity as T;

        getConnection().manager.remove(entity).then(() => {
            res.send(true);
        }).catch(err => {
            res.send(false);
        })
    }
}