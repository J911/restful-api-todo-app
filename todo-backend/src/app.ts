import * as express from 'express'
import * as bodyParser from "body-parser"

import Api from './api'
import Middleware from './middleware'

export default class App {

    private app: express.Application;
    private port: number;

    constructor (port?: number) {
        this.port = port || 3000;
        this.app = express();

        this.setMiddleware();
        this.setApi();
        this.listen();
    }

    private setMiddleware(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use('/api/v1', Middleware.route);
    }

    private setApi(): void {
        this.app.use('/api/v1', Api.route);
    }

    private listen(): void {
        this.app.listen(this.port, () => {
            console.log("server is running");
        });
    }
}
