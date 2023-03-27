import { ILogin } from './../../interfaces/login/ILogin';
import LoginEntity from './../../entity/login/LoginEntity';
import ResponseUserFactory from '../../factorys/user/response/responseUserFactory';
import ResponseLoginFactory from '../../factorys/login/response/responseLoginFactory';
import authService from './../../services/auth/authService';

class LoginService {
  public responseUserFactory = new ResponseUserFactory();
  public responseLoginFactory = new ResponseLoginFactory();

  public async login(user: ILogin) {
    const { email, password } = user;

    if (!email || !password) {
      return this.responseUserFactory.responseUser('Bad request', 'invalid data', 400, []);
    }
    const isExistsUser = await LoginEntity.login(user);

    if (!isExistsUser) {
      return { statusCode: 401, status: 'Unauthorized', message: 'User already exists' };
    }

    if (isExistsUser.password !== user.password)
      return {
        statusCode: 401,
        status: 'Unauthorized',
        message: 'incorrect password',
      };

    const { token, expiresIn, type } = await authService.authenticate(user);

    return this.responseLoginFactory.responseLogin(200, 'success', token, expiresIn, type);
  }
}

export default new LoginService();
