import {IAccount} from "../models/account-model";
import {ITodo} from "../models/todo-model";

export interface IResponse {
  error: boolean,
  status: number,
  token?: string,
  account?: IAccount,
  todos?: Array<ITodo>,
  todo?: ITodo
}