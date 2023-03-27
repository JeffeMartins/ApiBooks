import {Router} from 'express';
import LoginController from "../../controllers/login/LoginController";

export class LoginRoutes {
    public router = Router();
    public loginController = new LoginController();

    constructor() {
        this.init();
    }

    private init() {
        this.router.post('/login', this.loginController.login);
    }
}

const loginRoutes = new LoginRoutes();
export default loginRoutes.router;
