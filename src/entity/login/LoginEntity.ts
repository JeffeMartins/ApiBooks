import { prisma } from '../../config/database/client';
import { ILogin } from './../../interfaces/login/ILogin';

class UsersEntity {
  public prismaClient = prisma;

  public async login(data: ILogin) {
    return await this.prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    });
  }
}

export default new UsersEntity();
