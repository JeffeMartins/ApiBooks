import { Router } from 'express';
import UserController from '../../controllers/users/userController';

export class UserRoutes {
  public router = Router();
  private createdUserController: UserController;

  constructor() {
    this.createdUserController = new UserController();
    this.init();
  }

  private init() {
    this.router.post('/createUser', this.createdUserController.createUser);
    this.router.put('/updateUser', this.createdUserController.updateUser);
    this.router.delete('/deleteUser', this.createdUserController.deleteUser);
    this.router.get('/getAllUser', this.createdUserController.getAllUser);
    this.router.get('/findUser', this.createdUserController.findUser);
  }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;
