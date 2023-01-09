import { userRegisterRequest } from 'models/request/auth/userRegisterRequest';
import { userLoginRequest } from 'models/request/auth/userLoginRequest';
import { LoginResponse } from 'models/response/loginResponse';
import { AuthResponse } from 'models/response/authResponse';

import agent from 'lib/agent';

const BASE_URL = '/auth';

const authService = {
  register: (userRegisterRequest: userRegisterRequest) =>
    agent.post<userRegisterRequest>(
      `${BASE_URL}/register`,
      userRegisterRequest
    ),

  login: (userLoginRequest: userLoginRequest) =>
    agent.post<LoginResponse>(`${BASE_URL}/login`, userLoginRequest),

  logout: () => agent.post<any>(`${BASE_URL}/logout`, {}),

  refreshToken: () => agent.get<AuthResponse>(`${BASE_URL}/refresh-token`),
};

export default authService;
