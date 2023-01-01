import { userRegisterRequest } from 'requestModels/userRegisterRequest';
import { userLoginRequest } from 'requestModels/userLoginRequest';
import { LoginResponse } from 'models/loginResponse';
import { AuthResponse } from 'models/authResponse';

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

  logout: () => agent.get<any>(`${BASE_URL}/logout`),
  
  refreshToken: () => agent.get<AuthResponse>(`${BASE_URL}/refresh-token`)
};

export default authService;
