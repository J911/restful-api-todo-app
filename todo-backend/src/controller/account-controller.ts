import {Account, IAccount} from '../models/account-model'
import {IResponse} from "../interface/response-model";

class AccountController {
  
  constructor() {
  }
  
  public async findByName(name: string): Promise<IResponse> {
    let account: IAccount;
    try { account = await Account.findOne({name}) }
    catch (e) { return { error: true, status: 500 } }
    return { error: false, status: 200, account };
  }
  
  public async create(name: string, hashedPassword: string): Promise<IResponse> {
    try { await Account.create({name, password: hashedPassword}) }
    catch (e) { return { error: true, status: 500 } }
    return { error: false, status: 201 };
  }
  
}

export default new AccountController;
