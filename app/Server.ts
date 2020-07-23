import bodyParser from 'body-parser';
import { EntityRoute } from './routes/RouteFactory';
import {Express, Request, Response} from "express";
import express from "express";
import * as path from "path";
import {createConnection} from "typeorm";
import cookieParser from 'cookie-parser';

export class Server {

    private app: Express;

    constructor(app: Express, routes: EntityRoute[]) {
        this.app = app;

        createConnection({
            "type": "mysql",
            "host": "localhost",
            "port": 3306,
            "username": "root",
            "password": "drinkMe123",
            "database": "whisky",
            "synchronize": true,
            "logging": true,
            insecureAuth : true,
            "connectTimeout": 10000,
            "entities": [
                __dirname + "\\entity\\*.ts"
            ],
        })

        this.app.use(express.static(path.resolve("./") + "/build/frontend"));

        // middlewares
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());

        app.use((req, res, next) => {
            res.append('Access-Control-Allow-Origin', req.headers.origin);
            res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.append('Access-Control-Allow-Headers', 'Content-Type');
            res.append('Access-Control-Allow-Credentials', 'true');
            next();
        });

        this.app.get("/api", (req: Request, res: Response): void => {
            res.send("You have reached the API!");
        });

        this.addRoutes(routes);

        this.app.get("*", (req: Request, res: Response): void => {
            res.sendFile(path.resolve("./") + "/build/frontend/index.html");
        });
    }

    public start(port: number): void {
        this.app.listen(port, () => console.log(`Server listening on port ${port}!`));
    }

    private addRoutes(routes: EntityRoute[]) {
        routes.forEach(({uri, router}) => {
            this.app.use(uri, router());
        })
    }

}

