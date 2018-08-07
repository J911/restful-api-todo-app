import {Account, IAccount} from '../models/account-model'

class AccountController {
  
  constructor() {
  }
  
  public async findByName(name: string): Promise<IAccount> {
    return await Account.findOne({name});
  }
  
  public async create(name: string, hashedPassword: string): Promise<IAccount> {
    return await Account.create({name, password: hashedPassword})
  }
  
}

export default new AccountController;
