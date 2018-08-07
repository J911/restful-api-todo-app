import {Request, Response} from 'express'
import {hashSync, compareSync} from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import jwtConfig from '../config/jwt-config'

import {IAccount} from '../models/account-model'
import AccountController from './account-controller'

class AuthController {
  
  constructor() {
  }
  
  public async signin(req: Request, res: Response): Promise<Response> {
    const name = req.body.name;
    const password = req.body.password;
  
    if (name === undefined || password === undefined) return res.sendStatus(400);
  
    let account: IAccount;
    
    try { account = await AccountController.findByName(name) }
    catch (e) { return res.sendStatus(500) }
    
    if (account === null) return res.sendStatus(404);
    
    const passwordIsValid = compareSync(password, account.password);
    if (!passwordIsValid) return res.sendStatus(401);
    
    const token = jwt.sign({id: account._id}, jwtConfig.secret, {expiresIn: 86400});
    return res.status(200).json({token: token});
  }
  
  public async signup(req: Request, res: Response): Promise<Response> {
    const name = req.body.name;
    const password = req.body.password;
    
    const hashedPassword = hashSync(password, 8);
    
    if (name === undefined || password === undefined) return res.sendStatus(400);
  
    let account: IAccount;
  
    try { account = await AccountController.findByName(name) }
    catch (e) { return res.sendStatus(500) }
  
    if (account !== null) return res.sendStatus(409);
    
    try { await AccountController.create(name, hashedPassword) }
    catch (e) { res.sendStatus(500) }
    
    return res.sendStatus(201);
  }
  
}

export default new AuthController;
