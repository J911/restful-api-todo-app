import RouterAbstract from '../../router-abstract'

class Account extends RouterAbstract {

    private static instance = new Account();
    
    constructor () {
        if(!!Account.instance) return Account.instance;
        super();
        this.setRoutes();
    }

    private setRoutes(): void {
       
    }
    
}

export default new Account;