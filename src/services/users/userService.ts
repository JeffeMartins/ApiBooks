import { IUser } from './../../interfaces/user/IUser';
import UsersEntity from './../../entity/user/usersEntity';
import ResponseFactoryUser from './../../factorys/user/response/responseUserFactory';

class UserService {
  public responseFactoryUser = new ResponseFactoryUser();

  public async create(user: IUser) {
    const isExistsUser = await UsersEntity.find(user.email);
    if (!isExistsUser) {
      await UsersEntity.create(user);
      return this.responseFactoryUser.responseUser(
        'success',
        'User created successfully',
        201,
        user
      );
    }
    return this.responseFactoryUser.responseUser(
      'success',
      'User already exists',
      409,
      isExistsUser
    );
  }

  public async update(user: IUser) {
    const isExistsUser = await UsersEntity.find(user.email);
    if (isExistsUser) {
      const dataUpdate = {
        ...user,
        updatedAt: new Date(),
      };
      await UsersEntity.update(user, dataUpdate);
      return this.responseFactoryUser.responseUser('', '', 204, user);
    }
    return this.responseFactoryUser.responseUser('error', 'user does not exist', 400, isExistsUser);
  }

  public async delete(email: string) {
    const isExistsUser = await UsersEntity.find(email);
    if (isExistsUser) {
      await UsersEntity.delete(email);
      return this.responseFactoryUser.responseUser('', '', 204, {});
    }

    return this.responseFactoryUser.responseUser('error', 'user does not exist', 400, isExistsUser);
  }

  public async getAllUser() {
    const users = await UsersEntity.getAllUser();
    return this.responseFactoryUser.responseUser('success', 'OK', 200, users);
  }

  public async find(email: string) {
    const response = await UsersEntity.find(email);
    if (!response || response === null)
      return this.responseFactoryUser.responseUser('Error', 'User does not exist', 404, {});
    return this.responseFactoryUser.responseUser('Success', 'OK', 200, response);
  }
}

export default new UserService();
