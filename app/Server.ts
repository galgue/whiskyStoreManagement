import { UsesRoute } from './routes/Uses.routes';
import { NotesRoute } from './routes/Notes.routes';
import { MissionsRoute } from './routes/Missions.routes';
import { BerralBatchsRoute } from './routes/BerralBatch.routes';
import { ProssesChainRoutes } from './routes/ProssesChains.routes';
import { ProssesRoute } from "./routes/Prosseses.routes"
import { BerralTypeRoute } from './routes/BerralTypes.routes';
import { UsersRoutes } from './routes/users.routes';
import {Express, Request, Response} from "express";
import express from "express";
import * as path from "path";
import {createConnection, Connection} from "typeorm";

export class Server {

    private app: Express;

    constructor(app: Express) {
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

        this.app.get("/api", (req: Request, res: Response): void => {
            res.send("You have reached the API!");
        });

        new UsersRoutes().initRoutes(app);
        new BerralTypeRoute().initRoutes(app);
        new ProssesRoute().initRoutes(app);
        new ProssesChainRoutes().initRoutes(app);
        new BerralBatchsRoute().initRoutes(app);
        new MissionsRoute().initRoutes(app);
        new NotesRoute().initRoutes(app);
        new UsesRoute().initRoutes(app);

        this.app.get("*", (req: Request, res: Response): void => {
            res.sendFile(path.resolve("./") + "/build/frontend/index.html");
        });
    }

    public start(port: number): void {
        this.app.listen(port, () => console.log(`Server listening on port ${port}!`));
    }

    private parseConnectionUrl(url: string) {
        const type = url.split(":")[0];
        const firstSlashes = url.indexOf("//");
        const preBase = url.substr(firstSlashes + 2);
        const secondSlash = preBase.indexOf("/");
        const base = (secondSlash !== -1) ? preBase.substr(0, secondSlash) : preBase;
        const afterBase = (secondSlash !== -1) ? preBase.substr(secondSlash + 1) : undefined;

        const lastAtSign = base.lastIndexOf("@");
        const usernameAndPassword = base.substr(0, lastAtSign);
        const hostAndPort = base.substr(lastAtSign + 1);

        let username = usernameAndPassword;
        let password = "";
        const firstColon = usernameAndPassword.indexOf(":");
        if (firstColon !== -1) {
            username = usernameAndPassword.substr(0, firstColon);
            password = usernameAndPassword.substr(firstColon + 1);
        }
        const [host, port] = hostAndPort.split(":");

        return {
            type: type,
            host: host,
            username: decodeURIComponent(username),
            password: decodeURIComponent(password),
            port: port ? parseInt(port) : undefined,
            database: afterBase || undefined
        };
    }

}

