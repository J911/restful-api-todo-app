import * as express from 'express'
import * as bodyParser from "body-parser"

import Api from './api'
import Middleware from './middleware'

export default class App {
  
  private app: express.Application;
  
  get application(): express.Application {
    return this.app;
  }
  
  constructor(port?: number) {
    this.app = express();
    
    this.setMiddleware();
    this.setApi();
  }
  
  private setMiddleware(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use('/api/v1', Middleware.route);
  }
  
  private setApi(): void {
    this.app.use('/api/v1', Api.route);
  }
  
  public listen(port: number = 3000): void {
    this.app.listen(port, () => {
      console.log("server is running");
    });
  }
}
