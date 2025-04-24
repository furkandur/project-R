import { MongoDataSource } from "apollo-datasource-mongodb";
import User, { IUser, UserDocument } from "../models/User";

export class UserDatasource extends MongoDataSource<UserDocument> {
  async getAll() {
    try {
      return await User.find();
    } catch (error) {
      console.error("Error fetching all users: ", error);
      throw error;
    }
  }

  async findOne(searchObj: object) {
    try {
      return await User.findOne(searchObj);
    } catch (error) {
      console.error("Error fetching user: ", error);
      throw error;
    }
  }

  async create(newUser: IUser) {
    try {
      return await User.create(newUser);
    } catch (error) {
      console.error("Error creating user: ", error);
      throw error;
    }
  }
}
