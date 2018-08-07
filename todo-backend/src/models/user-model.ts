import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  _id: string,
  name: string,
  password: string
}

const UserSchema = new mongoose.Schema ({
  name: String,
  password: String
});

mongoose.model('User', UserSchema);

export const User = mongoose.model('User');
