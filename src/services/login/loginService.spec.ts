import {hashSync} from 'bcryptjs';
import { describe, expect, it, vi } from 'vitest';
import LoginSevice from './loginService';
import LoginEntity from './../../entity/login/LoginEntity';
import authService from './../../services/auth/authService';

describe('Testing login Book', () => {
  it('Should return User success for Login', async () => {
    const request = {
      email: 'jefferson@teste.com.br',
      password: '123456',
    };
    const createBookentity = vi.spyOn(LoginEntity, 'login');
    const authenticate = vi.spyOn(authService, 'authenticate');

    const mockAuth = {
      statusCode: 200,
      status: 'success',
      token:
        'test-token',
      expiresIn: 86400,
      type: 'jwt',
    };

    createBookentity.mockResolvedValue({...request,password:hashSync(request.password,10)});
    authenticate.mockResolvedValue(mockAuth);

    const response = await LoginSevice.login(request);
    expect(response.statusCode).toEqual(200);
  });

  it('Should return User already exists for Login', async () => {
    const request = {
      email: 'jefferson@teste.com.br',
      password: '123456',
    };
    const createBookentity = vi.spyOn(LoginEntity, 'login');
    const mock = false;
    createBookentity.mockResolvedValue(mock);

    const response = await LoginSevice.login(request);
    expect(response.statusCode).toEqual(401);
  });

  it('Should return User already exists for Login', async () => {
    const request = {
      email: 'jefferson@teste.com.br',
      password: '123456',
    };
    const createBookentity = vi.spyOn(LoginEntity, 'login');
    const authenticate = vi.spyOn(authService, 'authenticate');

    const mock = false;
    const mockAuth = {
      statusCode: 200,
      status: 'success',
      token:
        'test-token',
      expiresIn: 86400,
      type: 'jwt',
    };

    createBookentity.mockResolvedValue(mock);
    authenticate.mockResolvedValue(mockAuth);

    const response = await LoginSevice.login(request);
    expect(response.statusCode).toEqual(401);
  });

  it('Should return User Unauthorized for Login', async () => {
    const request = {
      email: 'jefferson@teste.com.br',
      password: '123456',
    };
    const createBookentity = vi.spyOn(LoginEntity, 'login');

    createBookentity.mockResolvedValue({
      email: 'jefferson@teste.com.br',
      password: '12345678',
    });

    const response = await LoginSevice.login(request);
    expect(response.statusCode).toEqual(401);
  });

  it('Should return Bad request for Login', async () => {
    const request = {
      email: '',
      password: '123456',
    };

    const response = await LoginSevice.login(request);
    expect(response.statusCode).toEqual(400);
  });
});
