import RouterAbstract from './RouterAbstract'

import Auth from './auth'
import Account from './account'
import Todo from './todo'

class Api extends RouterAbstract {

    constructor () {
        super();
        this.routes();
    }

    private routes(): void {
        this.router.use('/auth', Auth.route);
        this.router.use('/account', Account.route);
        this.router.use('/auth', Todo.route);
    }

}

export default new Api;
