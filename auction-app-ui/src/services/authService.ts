import { userRegisterRequest } from 'requestModels/userRegisterRequest';

import agent from 'lib/agent';

const BASE_URL = '/auth';

const authService = {
  register: (userRegisterRequest: userRegisterRequest) =>
    agent.post<userRegisterRequest>(
      `${BASE_URL}/register`,
      userRegisterRequest
    ),
};

export default authService;
