import { Router } from 'express';
import Authorization from '../../middlewares/authMiddleware';
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
    this.router.put('/updateUser', new Authorization().authToken, this.createdUserController.updateUser);
    this.router.delete('/deleteUser', new Authorization().authToken, this.createdUserController.deleteUser);
    this.router.get('/getAllUser', new Authorization().authToken, this.createdUserController.getAllUser);
    this.router.get('/findUser', new Authorization().authToken, this.createdUserController.findUser);
  }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;
