import RouterAbstract from '../../router-abstract'
import AuthController from './auth-controller'

class Auth extends RouterAbstract {
  
  private static instance = new Auth();
  
  constructor() {
    if (!!Auth.instance) return Auth.instance;
    super();
    this.setRoutes();
  }
  
  private setRoutes(): void {
    this.router.post('/sign-in', AuthController.signin.bind(AuthController));
    this.router.post('/sign-up', AuthController.signup.bind(AuthController));
  }
  
}

export default new Auth;