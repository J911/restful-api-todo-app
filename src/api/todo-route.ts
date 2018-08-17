import {Request, Response} from 'express'

import RouterAbstract from '../router-abstract'
import TodoController from '../controller/todo-controller'

class TodoRoute extends RouterAbstract {
  
  private static instance = new TodoRoute();
  
  constructor() {
    if (!!TodoRoute.instance) return TodoRoute.instance;
    super();
    this.setRoutes();
  }
  
  private setRoutes(): void {
    this.router.get('/:todoId', this.getTodoById);
    this.router.delete('/:todoId', this.deleteTodoById);
    this.router.get('/', this.getTodos);
    this.router.post('/', this.createTodo);
    this.router.put('/:todoId/title', this.updateTodoTitleById);
    this.router.put('/:todoId/contents', this.updateTodoContentsById);
    this.router.put('/:todoId/status', this.updateTodoStatusById);
  }
  
  /**
    * @swagger
    * /todos:
    *   get:
    *     description: get every todo
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: x-access-token
    *         in: header
    *         description: token to be passed as a header
    *         required: true
    *         type: string
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
  private async getTodos(req: Request, res: Response): Promise<Response> {
    const accountId = req.body.accountId;
    
    const result = await TodoController.findAll(accountId);
    if (result.error || result.todos === undefined) return res.sendStatus(result.status);
    
    return res.status(200).json({ todos: result.todos });
  }
  
  /**
    * @swagger
    * /todos/{todoId}:
    *   get:
    *     description: find every todo by id
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: x-access-token
    *         in: header
    *         description: token to be passed as a header
    *         required: true
    *         type: string
    *       - name: "todoId"
    *         in: "path"
    *         description: "todo's id"
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
  private async getTodoById(req: Request, res: Response): Promise<Response> {
    const accountId = req.body.accountId;
    const todoId = req.params.todoId;
  
    const result = await TodoController.findById(todoId, accountId);
    if (result.error || result.todo === undefined) return res.sendStatus(result.status);
    if (result.todo === null) return res.sendStatus(404);
    
    return res.status(200).json({ todo: result.todo });
  }
  /**
    * @swagger
    * /todos/{todoId}:
    *   delete:
    *     description: deletes todo by id
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: x-access-token
    *         in: header
    *         description: token to be passed as a header
    *         required: true
    *         type: string
    *       - name: "todoId"
    *         in: "path"
    *         description: "todo's id"
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
  private async deleteTodoById(req: Request, res: Response): Promise<Response> {
    const accountId = req.body.accountId;
    const todoId = req.params.todoId;

    const remove = await TodoController.removeById(accountId, todoId);
    if (remove.error) return res.sendStatus(remove.status);
  
    return res.sendStatus(204);
  }
  
  /**
    * @swagger
    * /todos:
    *   post:
    *     description: create todo
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: x-access-token
    *         in: header
    *         description: token to be passed as a header
    *         required: true
    *         type: string
    *       - name: "todoId"
    *         in: "path"
    *         description: "todo's id"
    *         required: true
    *         type: "string"
    *       - name: "title"
    *         in: "formData"
    *         description: "todo's title"
    *         required: true
    *         type: "string"
    *       - name: "contents"
    *         in: "formData"
    *         description: "todo's contents"
    *         required: true
    *         type: "string"
    *     responses:
    *       201:
    *         description: create
    *       400:
    *         description: bad request
    *       401:
    *         description: require token
    *       403:
    *         description: forbidden
    *       500:
    *         description: server error
    */
  private async createTodo(req: Request, res: Response): Promise<Response> {
    const title = req.body.title || '';
    const contents = req.body.contents || '';
    const accountId = req.body.accountId;
    
    const result = await TodoController.create({title, contents}, accountId);
    if (result.error) return res.sendStatus(result.status);
    
    return res.sendStatus(201);
  }
  
  /**
    * @swagger
    * /todos/{todoId}/title:
    *   put:
    *     description: update todo title
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: x-access-token
    *         in: header
    *         description: token to be passed as a header
    *         required: true
    *         type: string
    *       - name: "todoId"
    *         in: "path"
    *         description: "todo's id"
    *         required: true
    *         type: "string"
    *       - name: "title"
    *         in: "formData"
    *         description: "todo's title"
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
  private async updateTodoTitleById(req: Request, res: Response): Promise<Response> {
    const title = req.body.title;
    const todoId = req.params.todoId;
    const accountId = req.body.accountId;
  
    const update = await TodoController.updateTitleById(title, todoId, accountId);
    if (update.error) return res.sendStatus(update.status);
  
    return res.sendStatus(204);
  }
  
  /**
    * @swagger
    * /todos/{todoId}/contents:
    *   put:
    *     description: update todo contents
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: x-access-token
    *         in: header
    *         description: token to be passed as a header
    *         required: true
    *         type: string
    *       - name: "todoId"
    *         in: "path"
    *         description: "todo's id"
    *         required: true
    *         type: "string"
    *       - name: "contents"
    *         in: "formData"
    *         description: "todo's contents"
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
  private async updateTodoContentsById(req: Request, res: Response): Promise<Response> {
    const contents = req.body.contents;
    const todoId = req.params.todoId;
    const accountId = req.body.accountId;
  
    const update = await TodoController.updateContentsById(contents, todoId, accountId);
    if (update.error) return res.sendStatus(update.status);
  
    return res.sendStatus(204);
  }
  
  /**
    * @swagger
    * /todos/{todoId}/status:
    *   put:
    *     description: update todo status
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: x-access-token
    *         in: header
    *         description: token to be passed as a header
    *         required: true
    *         type: string
    *       - name: "todoId"
    *         in: "path"
    *         description: "todo's id"
    *         required: true
    *         type: "string"
    *       - name: "status"
    *         in: "formData"
    *         description: "todo status"
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
  private async updateTodoStatusById(req: Request, res: Response): Promise<Response> {
    const status = req.body.status;
    const todoId = req.params.todoId;
    const accountId = req.body.accountId;
  
    const update = await TodoController.updateStatusById(status, todoId, accountId);
    if (update.error) return res.sendStatus(update.status);
  
    return res.sendStatus(204);
  }
  
}

export default new TodoRoute;
