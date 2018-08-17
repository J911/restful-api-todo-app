import {Request, Response} from 'express'

import RouterAbstract from '../router-abstract'
import AccountController from "../controller/account-controller";

class AccountRoute extends RouterAbstract {
  
  private static instance = new AccountRoute();
  
  constructor() {
    if (!!AccountRoute.instance) return AccountRoute.instance;
    super();
    this.setRoutes();
  }
  
  private setRoutes(): void {
    this.router.get('/:name', this.findAccountByName);
    this.router.delete('/:name', this.deleteAccount);
    this.router.put('/:name/password', this.updatePasswordByName);
    this.router.put('/:name/name', this.updateName);
  }
  /**
    * @swagger
    * /accounts/{name}:
    *   get:
    *     description: gets account by account name
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: x-access-token
    *         in: header
    *         description: token to be passed as a header
    *         required: true
    *         type: string
    *       - name: "name"
    *         in: "path"
    *         description: "account's name"
    *         required: true
    *         type: "string"
    *     responses:
    *       200:
    *         description: found
    *       400:
    *         description: bad request
    *       401:
    *         description: require token
    *       403:
    *         description: forbidden
    *       500:
    *         description: server error
    */
  private async findAccountByName(req: Request, res: Response): Promise<Response> {
    const name = req.params.name;
    
    const result = await AccountController.findByName(name);
    if (result.error) return res.sendStatus(500);
    if (result.account === null) return res.sendStatus(404);
    
    return res.status(200).json({
      ...result.account,
      password: null
    });
  }
  /**
    * @swagger
    * /accounts/{name}/password:
    *   put:
    *     description: updates account name
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: x-access-token
    *         in: header
    *         description: token to be passed as a header
    *         required: true
    *         type: string
    *       - name: "name"
    *         in: "path"
    *         description: "account's name"
    *         required: true
    *         type: "string"
    *       - name: "name"
    *         in: "formData"
    *         description: "account's name"
    *         required: true
    *         type: "string"
    *       - name: "password"
    *         in: "formData"
    *         description: "account's password"
    *         required: true
    *         type: "string"
    *       - name: "newPassword"
    *         in: "formData"
    *         description: "new password"
    *         required: true
    *         type: "string"
    *     responses:
    *       204:
    *         description: update
    *       400:
    *         description: bad request
    *       401:
    *         description: require token
    *       403:
    *         description: forbidden
    *       500:
    *         description: server error
    */
  private async updatePasswordByName(req: Request, res: Response): Promise<Response> {
    const name = req.body.name;
    const password = req.body.password;
    const newPassword = req.body.newPassword;
    
    const result = await AccountController.validateAccount(name, password);
    if (result.error || result.account === undefined) return res.sendStatus(result.status);
    
    const update = await AccountController.updatePasswordByName(name, newPassword);
    if (update.error) return res.sendStatus(update.status);
    
    return res.sendStatus(204);
  }
  
  /**
    * @swagger
    * /accounts/{name}/password:
    *   put:
    *     description: updates account name
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: x-access-token
    *         in: header
    *         description: token to be passed as a header
    *         required: true
    *         type: string
    *       - name: "name"
    *         in: "path"
    *         description: "account's name"
    *         required: true
    *         type: "string"
    *       - name: "name"
    *         in: "formData"
    *         description: "account's name"
    *         required: true
    *         type: "string"
    *       - name: "password"
    *         in: "formData"
    *         description: "account's password"
    *         required: true
    *         type: "string"
    *       - name: "newName"
    *         in: "formData"
    *         description: "new name"
    *         required: true
    *         type: "string"
    *     responses:
    *       204:
    *         description: update
    *       400:
    *         description: bad request
    *       401:
    *         description: require token
    *       403:
    *         description: forbidden
    *       500:
    *         description: server error
    */
  private async updateName(req: Request, res: Response): Promise<Response> {
    const name = req.body.name;
    const newName = req.body.newName;
    const password = req.body.password;
    
    const result = await AccountController.validateAccount(name, password);
    if (result.error || result.account === undefined) return res.sendStatus(result.status);
    
    const update = await AccountController.updateName(name, newName);
    if (update.error) return res.sendStatus(update.status);
    
    return res.sendStatus(204);
  }
  
  /**
    * @swagger
    * /accounts/{name}/delete:
    *   delete:
    *     description: deletes account
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: x-access-token
    *         in: header
    *         description: token to be passed as a header
    *         required: true
    *         type: string
    *       - name: "name"
    *         in: "path"
    *         description: "account's name"
    *         required: true
    *         type: "string"
    *       - name: "name"
    *         in: "formData"
    *         description: "account's name"
    *         required: true
    *         type: "string"
    *       - name: "password"
    *         in: "formData"
    *         description: "account's password"
    *         required: true
    *         type: "string"
    *     responses:
    *       204:
    *         description: delete
    *       400:
    *         description: bad request
    *       401:
    *         description: require token
    *       403:
    *         description: forbidden
    *       500:
    *         description: server error
    */
  private async deleteAccount(req: Request, res: Response): Promise<Response> {
    const name = req.body.name;
    const password = req.body.password;
    
    const result = await AccountController.validateAccount(name, password);
    if (result.error || result.account === undefined) return res.sendStatus(result.status);
  
    const remove = await AccountController.removeByName(name);
    if (remove.error) return res.sendStatus(500);
  
    return res.sendStatus(204);
  }
}

export default new AccountRoute;
