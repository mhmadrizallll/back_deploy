import { Model, ModelObject } from "objection";

export class UsersModel extends Model {
  id!: string;
  username!: string;
  email!: string;
  password!: string;
  role!: "superadmin" | "admin" | "member";
  created_at!: Date;
  updated_at!: Date;

  static get tableName() {
    return "users";
  }
}

export type Users = ModelObject<UsersModel>;
