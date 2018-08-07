import RouterAbstract from '../router-abstract'

class TodoRoute extends RouterAbstract {
  
  private static instance = new TodoRoute();
  
  constructor() {
    if (!!TodoRoute.instance) return TodoRoute.instance;
    super();
    this.setRoutes();
  }
  
  private setRoutes(): void {

  }
  
}

export default new TodoRoute;
