import { Request, Response } from "express";
import { userService } from "../services/UserService";
import { encryptPassword, checkPassword } from "../utils/bcrypt";
import { v4 } from "uuid";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserControllers {
  async getUsers(req: Request, res: Response) {
    const role = req.user?.role;
    console.log(role);
    try {
      let users;
      if (role === "superadmin") {
        users = await userService.getAllUsers();
      } else if (role === "admin") {
        users = await userService.getAdminUsers();
      } else if (role === "member") {
        users = await userService.getMemberUsers();
      } else {
        res.status(401).json({ status: false, message: "Access forbidden" });
        return;
      }
      const withoutPassword = users.map((user) => {
        const { password, ...rest } = user;
        return rest;
      });
      res.status(200).json({
        status: true,
        message: "Users Available",
        data: withoutPassword,
      });
    } catch (err) {
      res.status(500).json({ status: false, message: err });
    }
  }
  async register(req: Request, res: Response) {
    const { username, email, password, role } = req.body;
    const roles = req.user?.role;
    try {
      const validatedPassword = (password: string) => {
        const capitalLetter = /^[A-Z]/;
        const containNumber = /[0-9]/;
        const containSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

        if (
          capitalLetter.test(password) &&
          containNumber.test(password) &&
          containSpecialChar.test(password)
        ) {
          return true;
        }
        return false;
      };

      if (!username || username.trim() === "") {
        res
          .status(400)
          .json({ status: false, message: "Username cannot be empty" });
        return;
      }

      if (!email || email.trim() === "") {
        res
          .status(400)
          .json({ status: false, message: "Email cannot be empty" });
        return;
      }

      if (!validatedPassword(password)) {
        res.status(400).json({
          status: false,
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        });
        return;
      }

      const payload = {
        id: v4(),
        username,
        email: email.toLowerCase(),
        password: await encryptPassword(password),
        role,
      };
      // role member tanpa authentikasi
      if (role === "member") {
        await userService.register(
          payload.id,
          payload.username,
          payload.email,
          payload.password,
          payload.role
        );
        return res.status(201).json({
          status: true,
          message: "Member created successfully",
          data: {
            id: payload.id,
            username: payload.username,
            email: payload.email,
            role: payload.role,
          },
        });
      }

      // jika tidak ada roles pada data user
      if (!roles) {
        res.status(401).json({ status: false, message: "Access forbidden" });
        return;
      }

      // jika roles bukan superadmin
      if (roles !== "superadmin") {
        res
          .status(401)
          .json({ status: false, message: "Only superadmin can register" });
        return;
      }

      // role superadmin tidak bisa dibuat
      if (role === "superadmin") {
        res
          .status(401)
          .json({ status: false, message: "Not create role superadmin" });
        return;
      }
      await userService.register(
        payload.id,
        payload.username,
        payload.email,
        payload.password,
        payload.role
      );
      res.status(201).json({
        status: true,
        message: "User created successfully",
        data: {
          id: payload.id,
          username: payload.username,
          email: payload.email,
          role: payload.role,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: false, message: err });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const user = await userService.login(username);
      console.log(user);
      if (!user) {
        res.status(404).json({ status: false, message: "User not found" });
        return;
      }

      const isPasswordCorrect = await checkPassword(user.password, password);
      if (!isPasswordCorrect) {
        res.status(401).json({ status: false, message: "Wrong password" });
        return;
      }

      const payload = {
        id: user.id,
        username: user.username,
        role: user.role,
      };
      let token;
      if (user.role === "superadmin") {
        token = jwt.sign(payload, process.env.SUPERADMIN_SECRET, {
          expiresIn: "30d",
        });
      } else if (user.role === "admin") {
        token = jwt.sign(payload, process.env.ADMIN_SECRET, {
          expiresIn: "30d",
        });
      } else if (user.role === "member") {
        token = jwt.sign(payload, process.env.MEMBER_SECRET, {
          expiresIn: "30d",
        });
      }
      console.log(payload);
      res.status(200).json({
        status: true,
        message: "User logged in successfully",
        user: { ...user, password: undefined },
        token,
      });
    } catch (err) {
      res.status(500).json({ status: false, message: err });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const userId: any = req.user?.id;
    const userRole = req.user?.role;
    console.log(id, userRole, userId);
    const data = req.body;
    try {
      //
      const validatedPassword = (password: string) => {
        const capitalLetter = /^[A-Z]/;
        const containNumber = /[0-9]/;
        const containSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

        if (
          capitalLetter.test(password) &&
          containNumber.test(password) &&
          containSpecialChar.test(password)
        ) {
          return true;
        }
        return false;
      };

      if (!data.username || data.username.trim() === "") {
        res
          .status(400)
          .json({ status: false, message: "Username cannot be empty" });
        return;
      }

      if (!data.email || data.email.trim() === "") {
        res
          .status(400)
          .json({ status: false, message: "Email cannot be empty" });
        return;
      }

      if (!validatedPassword(data.password)) {
        res.status(400).json({
          status: false,
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        });
        return;
      }

      const payload: any = {
        username: data.username,
        email: data.email.toLowerCase(),
        password: await encryptPassword(data.password),
        role: data.role,
        updated_at: new Date(),
      };
      //
      if (data.role === "member") {
        await userService.updateUser(id, {
          username: payload.username,
          email: payload.email,
          password: payload.password,
          role: payload.role,
          updated_at: payload.updated_at,
        });
        res.status(200).json({
          status: true,
          message: "User updated",
          data: {
            id: data.id,
            username: payload.username,
            email: payload.email,
            role: payload.role,
          },
        });
        return;
      }

      if (userId !== id && userRole !== "superadmin") {
        res
          .status(401)
          .json({ status: false, message: "Update for only superadmin" });
        return;
      }
      const user: any = await userService.updateUser(id, {
        username: payload.username,
        email: payload.email,
        password: payload.password,
        role: payload.role,
        created_at: payload.created_at,
        updated_at: payload.updated_at,
      });
      if (!user) {
        res.status(404).json({ status: false, message: "User not found" });
      }
      res.status(200).json({
        status: true,
        message: "User updated",
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          created_at: payload.created_at,
          updated_at: payload.updated_at,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: false, message: err });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const userId: any = req.user?.id;
    const userRole = req.user?.role;
    console.log(id, userRole, userId);
    try {
      if (userId !== id && userRole !== "superadmin") {
        res.status(401).json({ status: false, message: "Access forbidden" });
        return;
      }

      const user: any = await userService.deleteUser(id);
      if (!user) {
        res.status(404).json({ status: false, message: "User not found" });
        return;
      }

      res.status(200).json({ status: true, message: "User deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: false, message: err });
    }
  }

  async getCurrentUser(req: Request, res: Response): Promise<void> {
    const id: any = req.user?.id;
    try {
      const user = await userService.getCurrentUser(id);
      if (!user) {
        res.status(404).json({ status: false, message: "User not found" });
        return;
      }
      res.status(200).json({ status: true, message: "User Available", user });
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: false, message: err });
    }
  }

  async loginWithGoogle(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.body;

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const response: any = ticket.getPayload();
      console.log(response);
      const payload = {
        id: response.sub,
        email: response.email,
        name: response.name,
        picture: response.picture,
        role: "member",
      };
      const tokenJwt = jwt.sign(payload, process.env.MEMBER_SECRET, {});
      res.status(200).json({ status: true, token: tokenJwt, data: payload });
    } catch (err) {
      res.status(500).json({ status: false, message: err });
    }
  }
}

const userControllers = new UserControllers();
export { userControllers };
