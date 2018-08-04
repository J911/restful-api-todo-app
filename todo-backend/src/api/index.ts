import RouterBase from './router.base'

import Auth from './auth'
import Account from './Account'
import Todo from './todo'

class Api extends RouterBase {

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
