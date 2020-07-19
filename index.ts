import { ProssesChainRoute } from './app/routes/ProssesChains.routes';
import { UsesRoute } from './app/routes/Uses.routes';
import { ProssesRoute } from './app/routes/Prosseses.routes';
import { NotesRoute } from './app/routes/Notes.routes';
import { MissionsRoute } from './app/routes/Missions.routes';
import { BerralBatchsRoute } from './app/routes/BerralBatch.routes';
import { BerralTypesRoute } from './app/routes/BerralTypes.routes';
import { UsersRoute } from './app/routes/Users.routes';
import {Server} from "./app/Server";
import express from 'express';
const app = express();

const port = 8080;

const server = new Server(app, 
    [
        UsersRoute,
        BerralTypesRoute,
        BerralBatchsRoute,
        MissionsRoute,
        NotesRoute,
        ProssesRoute,
        ProssesChainRoute,
        UsesRoute
    ]
);

server.start(port);
