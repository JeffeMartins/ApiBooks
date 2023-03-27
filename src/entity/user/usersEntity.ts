import { PrismaClient } from '@prisma/client';
import { IUser } from './../../interfaces/user/IUser';

class UsersEntity {
  public prismaClient = new PrismaClient();

  public async create(data: IUser) {
    return await this.prismaClient.user.create({ data: data });
  }

  public async update(data: IUser, dataUpdate: object) {
    return await this.prismaClient.user.update({
      where: {
        email: data.email,
      },
      data: dataUpdate,
    });
  }

  public async delete(email: string) {
    return await this.prismaClient.user.delete({
      where: {
        email: email,
      },
    });
  }

  public async getAllUser() {
    return await this.prismaClient.user.findMany();
  }

  public async find(email: string) {
    return await this.prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });
  }
}

export default new UsersEntity();
