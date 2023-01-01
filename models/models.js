import { model } from 'mongoose';
import UserSchema from './schema/user.js';

const User = new model("User", UserSchema);

export { User };