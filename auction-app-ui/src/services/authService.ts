import { userRegisterRequest } from 'requestModels/userRegisterRequest';
import { userLoginRequest } from 'requestModels/userLoginRequest';

import agent from 'lib/agent';
import { AuthResponse } from 'models/authResponse';

const BASE_URL = '/auth';

const authService = {
  register: (userRegisterRequest: userRegisterRequest) =>
    agent.post<userRegisterRequest>(
      `${BASE_URL}/register`,
      userRegisterRequest
    ),

  login: (userLoginRequest: userLoginRequest) =>
    agent.post<AuthResponse>(`${BASE_URL}/login`, userLoginRequest),

  logout: () => agent.get<any>(`${BASE_URL}/logout`),
};

export default authService;
