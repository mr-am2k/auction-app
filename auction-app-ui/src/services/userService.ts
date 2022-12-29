import agent from 'lib/agent';
import { User } from 'models/user';

const BASE_URL = '/users';

const userService = {
  deactivate: () => agent.get<any>(`${BASE_URL}/deactivate `),
  getUser: () => agent.get<User>(`${BASE_URL}/user`),
};

export default userService;
