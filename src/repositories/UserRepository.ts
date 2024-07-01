import { UsersModel } from "../models/users.model";

class UserRepository {
  async getAllUsers(): Promise<UsersModel[]> {
    return await UsersModel.query();
  }
  async getAdminUsers(): Promise<UsersModel[]> {
    return await UsersModel.query().where("role", "admin");
  }
  async getMemberUsers(): Promise<UsersModel[]> {
    return await UsersModel.query().where("role", "member");
  }
  async createUser(user: Partial<UsersModel>): Promise<UsersModel> {
    return await UsersModel.query().insert(user);
  }
  async findByUsername(username: string): Promise<UsersModel | undefined> {
    return await UsersModel.query().findOne({ username });
  }
  async findById(id: string): Promise<UsersModel | undefined> {
    return await UsersModel.query().findById(id);
  }
  async updateUser(id: string, user: Partial<UsersModel>): Promise<UsersModel> {
    return await UsersModel.query().patchAndFetchById(id, user);
  }
  async deleteUser(id: string): Promise<void> {
    await UsersModel.query().deleteById(id);
    return;
  }
}

const userRepository = new UserRepository();
export { userRepository };
