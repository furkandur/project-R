import mongoose, { Document, Schema } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
}

export interface UserDocument extends IUser, Document {}

const UserSchema = new Schema<UserDocument>({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
