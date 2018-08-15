import {Types as MongoTypes} from 'mongoose'

import {Todo, ITodo} from '../models/todo-model'
import {IResponse} from "../interface/response-model"

class TodoController {
  
  private status: Array<string>;
  
  constructor() {
    this.status = ['doing', 'done', 'pending', 'cancel'];
  }
  
  public async findAll(accountId: string): Promise<IResponse> {
    if (accountId === undefined) return { error: true, status:400 };
    
    let todos: Array<ITodo>;
    try {
      todos = await Todo.find({accountId})
    }
    catch (e) { return { error: true, status: 500 } }
    return { error: false, status: 200, todos };
  }
  
  public async findById(todoId: string, accountId: string): Promise<IResponse> {
    if (todoId === undefined) return { error: true, status:400 };
    if (!MongoTypes.ObjectId.isValid(todoId)) return { error: true, status:400 };
  
    let todo: ITodo;
    try {
      todo = await Todo.findOne({_id: todoId, accountId});
    }
    catch (e) { return { error: true, status: 500 } }
    return { error: false, status: 200, todo };
  }
  
  public async removeById(accountId: string, todoId: string): Promise<IResponse> {
    if (accountId === undefined || todoId === undefined) return { error: true, status:400 };
    if (!MongoTypes.ObjectId.isValid(todoId)) return { error: true, status:400 };
  
    try {
      await Todo.remove({_id:todoId, accountId})
    }
    catch (e) { return { error: true, status: 500 } }
    return { error: false, status: 204 };
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
  
  public async updateTitleById(title: string, todoId: string, accountId: string): Promise<IResponse> {
    if (accountId === undefined || title == undefined || todoId == undefined) return { error: true, status:400 };
    if (!MongoTypes.ObjectId.isValid(todoId)) return { error: true, status:400 };
  
    try { await Todo.update({_id: todoId, accountId}, { $set: { title } }) }
    catch (e) { return { error: true, status: 500 } }
    return { error: false, status: 204 };
  }
  
  public async updateContentsById(contents: string, todoId: string, accountId: string): Promise<IResponse> {
    if (accountId === undefined || contents == undefined || todoId == undefined) return { error: true, status:400 };
    if (!MongoTypes.ObjectId.isValid(todoId)) return { error: true, status:400 };
    
    try { await Todo.update({_id: todoId, accountId}, { $set: { contents } }) }
    catch (e) { return { error: true, status: 500 } }
    return { error: false, status: 204 };
  }
  
  public async updateStatusById(status: string, todoId: string, accountId: string): Promise<IResponse> {
    if (accountId === undefined || status == undefined || todoId == undefined) return { error: true, status:400 };
    if (!MongoTypes.ObjectId.isValid(todoId)) return { error: true, status:400 };
    
    if (!this.checkStatus(status)) return {error: true, status:400};
    try { await Todo.update({_id: todoId, accountId}, { $set: { status } }) }
    catch (e) { return { error: true, status: 500 } }
    return { error: false, status: 204 };
  }
  
  private checkStatus(status: string): boolean {
    if (this.status.indexOf(status) === -1) return false;
    return true;
  }
}

export default new TodoController;
