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
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiamVmZmVyc29uQHRlc3RlLmNvbS5iciIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWF0IjoxNjc5ODA1MTEwLCJleHAiOjE2Nzk4OTE1MTB9.C59x6nPUULa4xH2JSmgu80ze_-YxCczP4GSmsAirX9s',
      expiresIn: 86400,
      type: 'jwt',
    };

    createBookentity.mockResolvedValue(request);
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
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiamVmZmVyc29uQHRlc3RlLmNvbS5iciIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWF0IjoxNjc5ODA1MTEwLCJleHAiOjE2Nzk4OTE1MTB9.C59x6nPUULa4xH2JSmgu80ze_-YxCczP4GSmsAirX9s',
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
