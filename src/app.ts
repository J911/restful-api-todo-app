import * as express from 'express'
import * as bodyParser from "body-parser"
import * as mongoose from 'mongoose'
import * as swaggerUi from 'swagger-ui-express'

import Api from './api'
import Middleware from './middleware'
import swaggerSpec from './config/swagger-config'

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
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    this.app.use('/', (req, res) => res.redirect('/api-docs'));
  }
  
  public listen(port: number = 3000): void {
    this.app.listen(port, () => {
      console.log("server is running");
    });
  }
  
}
