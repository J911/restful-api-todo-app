import RouterAbstract from '../router-abstract'

import * as AuthMiddleWare from './auth-middleware'

class Middleware extends RouterAbstract {

    constructor () {
        super();
        this.setRoutes();
    }

    private setRoutes(): void {
        this.route.use('/accounts', AuthMiddleWare.tokenValidationCheck)
        this.route.use('/todos', AuthMiddleWare.tokenValidationCheck)
    }

}

export default new Middleware;
