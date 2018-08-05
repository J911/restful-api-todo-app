import RouterAbstract from '../RouterAbstract'

import * as AuthMiddleWare from './auth.middleware'

class Middleware extends RouterAbstract {

    constructor () {
        super();
        this.routes();
    }

    private routes(): void {
        this.route.use('/accounts', AuthMiddleWare.tokenValidationCheck)
        this.route.use('/todos', AuthMiddleWare.tokenValidationCheck)
    }

}

export default new Middleware;
