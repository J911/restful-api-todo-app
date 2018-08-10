import * as mongoose from 'mongoose';

export interface ITodo extends mongoose.Document {
  _id: string,
  title: string,
  contents: string,
  status: string,
  createAt: number
}

const TodoSchema = new mongoose.Schema ({
  title: String,
  contents: String,
  status: String,
  createAt: Number
});

mongoose.model('Todo', TodoSchema);

export const Todo = mongoose.model('Todo');
