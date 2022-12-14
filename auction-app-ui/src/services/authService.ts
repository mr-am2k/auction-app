import { userRegisterRequest } from 'requestModels/userRegisterRequest';
import { userLoginRequest } from 'requestModels/userLoginRequest';

import agent from 'lib/agent';

const BASE_URL = '/auth';

const authService = {
  register: (userRegisterRequest: userRegisterRequest) =>
    agent.post<userRegisterRequest>(
      `${BASE_URL}/register`,
      userRegisterRequest
    ),

  login: (userLoginRequest: userLoginRequest) =>
    agent.post<userLoginRequest>(`${BASE_URL}/login`, userLoginRequest),
};

export default authService;
