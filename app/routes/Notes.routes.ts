import { Route } from './Route';
import { Express, Request, Response } from 'express';
import { getConnection } from "typeorm";
import { Note } from '../entity/Notes';

const GET_ALL_URI = '/note/get';
const GET_URI = '/note/get/:id';

export class NotesRoute implements Route {

    initRoutes(app: Express) {

        app.get(GET_ALL_URI, (_: Request, res: Response): void => {
            getConnection().manager.find(Note, {
                relations: 
                [
                    "berralBatch",
                    "creator",
                    "berralBatch.berralType",
                    "berralBatch.prossesChain",
                    "berralBatch.prossesChain.prosses1",
                    "berralBatch.prossesChain.prosses2",
                    "berralBatch.prossesChain.prosses3",
                    "berralBatch.prossesChain.prosses4",
                ]
            })
            .then(notes => {
                res.send(notes);
            })
        });

        app.get(GET_URI, (req: Request, res: Response): void => {
            getConnection().manager.findOne(Note, req.param('id'), 
            {
                relations: 
                [
                    "berralBatch",
                    "creator",
                    "berralBatch.berralType",
                    "berralBatch.prossesChain",
                    "berralBatch.prossesChain.prosses1",
                    "berralBatch.prossesChain.prosses2",
                    "berralBatch.prossesChain.prosses3",
                    "berralBatch.prossesChain.prosses4",
                ]
            })
            .then(note => {
                res.send(note);
            })
        });


    }



}