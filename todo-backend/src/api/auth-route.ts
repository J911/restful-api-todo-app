import RouterAbstract from '../router-abstract'

import AuthController from "../controller/auth-controller";

class AuthRoute extends RouterAbstract {
  
  private static instance = new AuthRoute();
  
  constructor() {
    if (!!AuthRoute.instance) return AuthRoute.instance;
    super();
    this.setRoutes();
  }
  
  private setRoutes(): void {
    this.router.post('/sign-in', AuthController.signin);
    this.router.post('/sign-up', AuthController.signup);
  }
  
}

export default new AuthRoute;
