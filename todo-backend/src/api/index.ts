import RouterAbstract from '../router-abstract'

import AuthRoute from "./auth-route"
import AccountRoute from "./account-route"
import TodoRoute from "./todo-route"

class Api extends RouterAbstract {
  
  private static instance = new Api();
  
  constructor() {
    if (!!Api.instance) return Api.instance;
    super();
    this.setRoutes();
  }
  
  private setRoutes(): void {
    this.router.use('/auth', AuthRoute.route);
    this.router.use('/accounts', AccountRoute.route);
    this.router.use('/auth', TodoRoute.route);
  }
  
}

export default new Api;
