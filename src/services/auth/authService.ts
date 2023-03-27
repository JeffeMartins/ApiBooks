import * as jwt from 'jsonwebtoken';
import authConfig from '../../config/authConfig';
import { ILogin } from '../../interfaces/login/ILogin';

class AuthService {
  public async authenticate(data: ILogin) {
    const { email, password } = data;

    const token = jwt.sign({ user: email, password }, authConfig.secret, {
      expiresIn: 86400,
    });

    return { token: token, expiresIn: 86400, type: 'jwt' };
  }
}

export default new AuthService();
