import { UsersModel } from "../models/users.model";
import { userRepository } from "../repositories/UserRepository";

class UserService {
  async getAllUsers(): Promise<UsersModel[]> {
    return await userRepository.getAllUsers();
  }

  async getAdminUsers(): Promise<UsersModel[]> {
    return await userRepository.getAdminUsers();
  }

  async getMemberUsers(): Promise<UsersModel[]> {
    return await userRepository.getMemberUsers();
  }
  async register(
    id: string,
    username: string,
    email: string,
    password: any,
    role: "superadmin" | "admin" | "member"
  ) {
    await userRepository.createUser({ id, username, email, password, role });
  }

  async login(username: string): Promise<UsersModel | null> {
    const user = await userRepository.findByUsername(username);
    if (user) {
      return user;
    }
    return null;
  }

  async updateUser(id: string, user: Partial<UsersModel>): Promise<UsersModel> {
    return await userRepository.updateUser(id, user);
  }

  async deleteUser(id: string): Promise<void> {
    await userRepository.deleteUser(id);
  }

  async getCurrentUser(id: string): Promise<UsersModel | undefined> {
    return await userRepository.findById(id);
  }
}

const userService = new UserService();
export { userService };
