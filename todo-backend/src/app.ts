import * as express from 'express'
import * as bodyParser from "body-parser"
import * as mongoose from 'mongoose'
import * as path from 'path'

import Api from './api'
import Middleware from './middleware'

import {config} from 'dotenv'

config();

export default class App {
  
  private app: express.Application;
  
  get application(): express.Application {
    return this.app;
  }
  
  constructor(port?: number) {
    this.app = express();
    
    this.connectDatabase();
    this.setMiddleware();
    this.setRoute();
  }
  
  private connectDatabase(): void {
    // @ts-ignore: Cannot find name 'process'.
    mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true });
  }
  
  private setMiddleware(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use('/api/v1', Middleware.route);
  }
  
  private setRoute(): void {
    this.app.use('/api/v1', Api.route);
    this.app.use('*', (req: express.Request, res: express.Response) =>
      res.sendFile(path.join(__dirname, '../../todo-frontend/dist/index.html')));
  }
  
  public listen(port: number = 3000): void {
    this.app.listen(port, () => {
      console.log("server is running");
    });
  }
  
}
