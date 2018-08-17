import {Request, Response} from 'express'

import RouterAbstract from '../router-abstract'
import AuthController from "../controller/auth-controller";

class AuthRoute extends RouterAbstract {
  
  private static instance = new AuthRoute();
  
  constructor() {
    if (!!AuthRoute.instance) return AuthRoute.instance;
    super();
    this.setRoutes();
  }
  
  private setRoutes(): void {
    this.router.post('/sign-in', this.signin);
    this.router.post('/sign-up', this.signup);
  }
  
  /**
    * @swagger
    * /auth/sign-in:
    *   post:
    *     description: Login to the application
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: name
    *         description: account's name to use for login.
    *         in: formData
    *         required: true
    *         type: string
    *       - name: password
    *         description: account's password.
    *         in: formData
    *         required: true
    *         type: string
    *     responses:
    *       200:
    *         description: login
    *       400:
    *         description: bad request
    *       401:
    *         description: password not matched
    *       404:
    *         description: account not found
    *       500:
    *         description: server error
    */
  private async signin(req: Request, res: Response): Promise<Response> {
    const name = req.body.name;
    const password = req.body.password;
  
    const result = await AuthController.signin(name, password);
    
    if (result.error) return res.sendStatus(result.status);
    
    return res.status(result.status).json({ token: result.token });
  }
  
  /**
    * @swagger
    * /auth/sign-up:
    *   post:
    *     description: Join to the application
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: name
    *         description: account's name to use for join.
    *         in: formData
    *         required: true
    *         type: string
    *       - name: password
    *         description: account's password.
    *         in: formData
    *         required: true
    *         type: string
    *     responses:
    *       201:
    *         description: create
    *       400:
    *         description: bad request
    *       409:
    *         description: confilct
    *       500:
    *         description: server error
    */
  private async signup(req: Request, res: Response): Promise<Response> {
    const name = req.body.name;
    const password = req.body.password;
    
    const result = await AuthController.signup(name, password);
    
    return res.sendStatus(result.status);
  }
  
}

export default new AuthRoute;
