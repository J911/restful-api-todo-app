import {Todo, ITodo} from '../models/todo-model'
import {IResponse} from "../interface/response-model";
import {Account} from "../models/account-model";

class TodoController {
  
  constructor() {
  }
  
  public async create(todo: { title: string, contents: string}, accountId: string): Promise<IResponse> {
    if (accountId === undefined) return { error: true, status:400 };
    try {
      await Todo.create({
        ...todo,
        accountId,
        status: 'doing',
        createAt: new Date()
      })
    }
    catch (e) { return { error: true, status: 500 } }
    return { error: false, status: 201 };
  }
}

export default new TodoController;
