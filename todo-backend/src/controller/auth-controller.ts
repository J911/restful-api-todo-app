import {hashSync, compareSync} from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import jwtConfig from '../config/jwt-config'

import AccountController from './account-controller'
import {IResponse} from "../interface/response-model";

class AuthController {
  
  constructor() {
  }
  
  public async signin(name: string, password: string): Promise<IResponse> {
    if (name === undefined || password === undefined)  return { error: true, status: 400 };
    
    const result = await AccountController.findByName(name);
    if (result.error || result.account === undefined) return { error: true, status: 500 };
    if (result.account === null) return { error: true, status: 404 };
    
    const passwordIsValid = compareSync(password, result.account.password);
    if (!passwordIsValid) return { error: true, status: 401 };
    
    const token = jwt.sign({id: result.account._id}, jwtConfig.secret, {expiresIn: 86400});
    return { error: false, status: 400, token };
  }
  
  public async signup(name: string, password: string): Promise<IResponse> {
    const hashedPassword = hashSync(password, 8);
    
    if (name === undefined || password === undefined) return { error: true, status: 400 };
  
    const result = await AccountController.findByName(name);
    if (result.error) return { error: true, status: 500 };
    if (result.account !== null) return { error: true, status: 409 };
    
    const createAccount = await AccountController.create(name, hashedPassword);
    if (createAccount.error) return { error: true, status: 500 };
    
    return { error: false, status: 201 };
  }
  
}

export default new AuthController;
