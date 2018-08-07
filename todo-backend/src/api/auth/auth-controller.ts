import {Request, Response, Send} from 'express'
import {hashSync, compareSync} from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import jwtConfig from '../../config/jwt-config'

import {User, IUser} from '../../models/user-model'

class AuthController {
  
  constructor() {
  }
  
  public async signin(req: Request, res: Response): Promise<Response> {
    
    const name = req.body.name;
    const password = req.body.password;
  
    if (name === undefined || password === undefined) return res.sendStatus(400);
  
    let user: IUser;
    
    try { user = await this.findUser(name) }
    catch (e) { return res.sendStatus(500) }
    
    if (user === null) return res.sendStatus(404);
    
    const passwordIsValid = compareSync(password, user.password);
    if (!passwordIsValid) return res.sendStatus(401);
    
    const token = jwt.sign({id: user._id}, jwtConfig.secret, {expiresIn: 86400});
    return res.status(200).json({token: token});
  }
  
  private async findUser(name): Promise<IUser> {
    const user = await User.findOne({name});
    return user;
  }
  
  public async signup(req: Request, res: Response): Promise<Response> {
    const name = req.body.name;
    const password = req.body.password;
    
    const hashedPassword = hashSync(password, 8);
    
    if (name === undefined || password === undefined) return res.sendStatus(400);
  
    let user: IUser;
  
    try { user = await this.findUser(name) }
    catch (e) { return res.sendStatus(500) }
  
    if (user !== null) return res.sendStatus(409);
    
    try { await User.create({name, password: hashedPassword}) }
    catch (e) { res.sendStatus(500) }
    
    return res.sendStatus(201);
  }
}

export default new AuthController;
