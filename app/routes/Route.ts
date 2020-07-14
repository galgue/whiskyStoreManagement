import { Express } from "express";
import { Connection } from "typeorm";


export interface Route {
    initRoutes(app: Express): void;
}