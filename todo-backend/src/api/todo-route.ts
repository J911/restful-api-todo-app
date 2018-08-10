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
  
  private async getTodos(req: Request, res: Response): Promise<Response> {
    const accountId = req.body.accountId;
    
    const result = await TodoController.findAll(accountId);
    if (result.error || result.todos === undefined) return res.sendStatus(result.status);
    
    return res.status(200).json({ todos: result.todos });
  }
  
  private async getTodoById(req: Request, res: Response): Promise<Response> {
    const accountId = req.body.accountId;
    const todoId = req.params.todoId;
  
    const result = await TodoController.findById(todoId, accountId);
    if (result.error || result.todo === undefined) return res.sendStatus(result.status);
    if (result.todo === null) return res.sendStatus(404);
    
    return res.status(200).json({ todo: result.todo });
  }
  
  private async deleteTodoById(req: Request, res: Response): Promise<Response> {
    const accountId = req.body.accountId;
    const todoId = req.params.todoId;

    const remove = await TodoController.removeById(accountId, todoId);
    if (remove.error) return res.sendStatus(remove.status);
  
    return res.sendStatus(204);
  }
  
  private async createTodo(req: Request, res: Response): Promise<Response> {
    const title = req.body.title || '';
    const contents = req.body.contents || '';
    const accountId = req.body.accountId;
    
    const result = await TodoController.create({title, contents}, accountId);
    if (result.error) return res.sendStatus(result.status);
    
    return res.sendStatus(201);
  }
  
  private async updateTodoTitleById(req: Request, res: Response): Promise<Response> {
    return res.sendStatus(500);
  }
  
  private async updateTodoContentsById(req: Request, res: Response): Promise<Response> {
    return res.sendStatus(500);
  }
  
  private async updateTodoStatusById(req: Request, res: Response): Promise<Response> {
    return res.sendStatus(500);
  }
  
}

export default new TodoRoute;
