import { UserRegisterRequest } from 'models/request/auth/userRegisterRequest';
import { UserLoginRequest } from 'models/request/auth/userLoginRequest';
import { LoginResponse } from 'models/response/loginResponse';
import { AuthResponse } from 'models/response/authResponse';

import agent from 'lib/agent';
import { UserSocialLoginRequest } from 'models/request/auth/userSocialLoginRequest';

const BASE_URL = '/auth';

const authService = {
  register: (userRegisterRequest: UserRegisterRequest) => agent.post<UserRegisterRequest>(`${BASE_URL}/register`, userRegisterRequest),
  login: (userLoginRequest: UserLoginRequest) => agent.post<LoginResponse>(`${BASE_URL}/login`, userLoginRequest),
  logout: () => agent.get<any>(`${BASE_URL}/logout`),
  refreshToken: () => agent.get<AuthResponse>(`${BASE_URL}/refresh-token`),
  socialLogin: (userSocialLoginRequest: UserSocialLoginRequest) =>
    agent.post<LoginResponse>(`${BASE_URL}/social-login`, userSocialLoginRequest),
};

export default authService;
