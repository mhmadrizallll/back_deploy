import { Knex } from "knex";
import { v4 } from "uuid";
import { encryptPassword } from "../src/utils/bcrypt";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      id: v4(),
      username: "superadmin",
      email: "superadmin@gmail.com",
      password: await encryptPassword("Superadmin1*"),
      role: "superadmin",
    },
    {
      id: v4(),
      username: "superadmin1",
      email: "superadmin1@gmail.com",
      password: await encryptPassword("Superadmin1*"),
      role: "superadmin",
    },
    {
      id: v4(),
      username: "superadmin2",
      email: "superadmin2@gmail.com",
      password: await encryptPassword("Superadmin1*"),
      role: "superadmin",
    },
    {
      id: v4(),
      username: "superadmin3",
      email: "superadmin3@gmail.com",
      password: await encryptPassword("Superadmin1*"),
      role: "superadmin",
    },
    {
      id: v4(),
      username: "superadmin4",
      email: "superadmin4@gmail.com",
      password: await encryptPassword("Superadmin1*"),
      role: "superadmin",
    },
    {
      id: v4(),
      username: "admin",
      email: "admin@admin.com",
      password: await encryptPassword("Admin1*"),
      role: "admin",
    },
    {
      id: v4(),
      username: "admin1",
      email: "admin1@admin.com",
      password: await encryptPassword("Admin1*"),
      role: "admin",
    },
    {
      id: v4(),
      username: "admin2",
      email: "admin2@admin.com",
      password: await encryptPassword("Admin1*"),
      role: "admin",
    },
    {
      id: v4(),
      username: "admin3",
      email: "admin3@admin.com",
      password: await encryptPassword("Admin1*"),
      role: "admin",
    },
    {
      id: v4(),
      username: "admin4",
      email: "admin4@admin.com",
      password: await encryptPassword("Admin1*"),
      role: "admin",
    },
    {
      id: v4(),
      username: "member",
      email: "member@member.com",
      password: await encryptPassword("Member1*"),
      role: "member",
    },
    {
      id: v4(),
      username: "member1",
      email: "member1@member.com",
      password: await encryptPassword("Member1*"),
      role: "member",
    },
    {
      id: v4(),
      username: "member2",
      email: "member2@member.com",
      password: await encryptPassword("Member1*"),
      role: "member",
    },
    {
      id: v4(),
      username: "member3",
      email: "member3@member.com",
      password: await encryptPassword("Member1*"),
      role: "member",
    },
    {
      id: v4(),
      username: "member4",
      email: "member4@member.com",
      password: await encryptPassword("Member1*"),
      role: "member",
    },
    {
      id: v4(),
      username: "member5",
      email: "member5@member.com",
      password: await encryptPassword("Member1*"),
      role: "member",
    },
    {
      id: v4(),
      username: "member6",
      email: "member6@member.com",
      password: await encryptPassword("Member1*"),
      role: "member",
    },
    {
      id: v4(),
      username: "member7",
      email: "member7@member.com",
      password: await encryptPassword("Member1*"),
      role: "member",
    },
  ]);
}
