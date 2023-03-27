import {Request, Response} from "express";
import LoginService from "./../../services/login/loginService";
import {ILogin} from "./../../interfaces/login/ILogin";

class LoginController {
    public async login(req: Request, res: Response) {
        try {
            const body: ILogin = req.body;
            const response = await LoginService.login(body)

            return res.status(response.statusCode).json(response);
        } catch
            (e) {
            return res.status(500).json(e);
        }
    }
}

export default LoginController;