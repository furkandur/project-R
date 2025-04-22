import { User } from "../models/User";

export class UserService {
  async getAll() {
    try {
      return await User.find();
    } catch (error) {
      console.error("Error fetching all users: ", error);
      throw error;
    }
  }
}
