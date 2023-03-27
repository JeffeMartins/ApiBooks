import { Request, Response } from 'express';
import UserService from './../../services/users/userService';
import { IUser } from './../../interfaces/user/IUser';

class UserController {
  public async createUser(req: Request, res: Response) {
    try {
      const body: IUser = req.body;
      const response = await UserService.create(body);

      return res.status(response.statusCode).json(response);
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  public async updateUser(req: Request, res: Response) {
    try {
      const body: IUser = req.body;
      const response = await UserService.update(body);

      return res.status(response.statusCode).json(response);
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  public async deleteUser(req: Request, res: Response) {
    try {
      const email: string = req.body.email;
      const response = await UserService.delete(email);

      return res.status(response.statusCode).json(response);
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  public async getAllUser(_req: Request, res: Response) {
    try {
      const response = await UserService.getAllUser();

      return res.status(response.statusCode).json(response);
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  public async findUser(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const response = await UserService.find(email);

      return res.status(response.statusCode).json(response);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
}

export default UserController;
