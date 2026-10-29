import * as jwt from 'jsonwebtoken';
import authConfig from '../../config/authConfig';
import { ILogin } from '../../interfaces/login/ILogin';

class AuthService {
  public async authenticate(data: ILogin) {
    const { email } = data;

    const token = jwt.sign({ sub: email }, authConfig.secret, {
      expiresIn: 86400,
    });

    return { token: token, expiresIn: 86400, type: 'jwt' };
  }
}

export default new AuthService();
