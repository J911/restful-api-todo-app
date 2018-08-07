import RouterAbstract from '../router-abstract'

class AccountRoute extends RouterAbstract {
  
  private static instance = new AccountRoute();
  
  constructor() {
    if (!!AccountRoute.instance) return AccountRoute.instance;
    super();
    this.setRoutes();
  }
  
  private setRoutes(): void {

  }
  
}

export default new AccountRoute;
