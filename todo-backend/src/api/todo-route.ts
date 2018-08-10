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
    return res.sendStatus(500);
  }
  
  private async getTodoById(req: Request, res: Response): Promise<Response> {
    return res.sendStatus(500);
  }
  
  private async deleteTodoById(req: Request, res: Response): Promise<Response> {
    return res.sendStatus(500);
  }
  
  private async createTodo(req: Request, res: Response): Promise<Response> {
    return res.sendStatus(500);
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
