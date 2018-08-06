import RouterAbstract from '../router-abstract'

import Auth from './auth'
import Account from './account'
import Todo from './todo'

class Api extends RouterAbstract {

    private static instance = new Api();

    constructor () {
        if (!!Api.instance) return Api.instance;
        super();
        this.setRoutes();
    }

    private setRoutes(): void {
        this.router.use('/auth', Auth.route);
        this.router.use('/account', Account.route);
        this.router.use('/auth', Todo.route);
    }

}

export default new Api;
