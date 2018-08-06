import RouterAbstract from '../../router-abstract'
import * as AuthCtrl from './auth-controller'

class Auth extends RouterAbstract {
  
  private static instance = new Auth();
  
  constructor() {
    if (!!Auth.instance) return Auth.instance;
    super();
    this.setRoutes();
  }
  
  private setRoutes(): void {
    this.router.post('/signin', AuthCtrl.signin);
    this.router.post('/signup', AuthCtrl.signup);
  }
  
}

export default new Auth;