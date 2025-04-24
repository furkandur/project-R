import { IUser, User } from "../models/User";

interface NewUser {
  username: string;
  email: string;
  password: string;
}

export class UserService {
  async getAll() {
    try {
      return await User.find();
    } catch (error) {
      console.error("Error fetching all users: ", error);
      throw error;
    }
  }

  async create(newUser: NewUser) {
    try {
      return await User.create(newUser);
    } catch (error) {
      console.error("Error creating user: ", error);
      throw error;
    }
  }
}
