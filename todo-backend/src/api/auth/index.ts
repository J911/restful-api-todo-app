import RouterBase from '../router.base'
import * as AuthCtrl from './auth.ctrl'

class Auth extends RouterBase {
    
    constructor () {
        super();
        this.routes();
    }

    private routes(): void {
        this.router.post('/signin', AuthCtrl.signin);
        this.router.post('/signup', AuthCtrl.signup);
    }
    
}

export default new Auth;