import agent from 'lib/agent';

const BASE_URL = '/users';

const userService = {
  deactivate: () => agent.get<any>(`${BASE_URL}/deactivate `),
};

export default userService;
