import agent from 'lib/agent';
import { User } from 'models/user';
import { UpdateUserDataRequest } from 'requestModels/updateUserDataRequest';

const BASE_URL = '/users';

const userService = {
  deactivate: () => agent.get<any>(`${BASE_URL}/deactivate `),
  getUser: () => agent.get<User>(`${BASE_URL}/user`),
  updateUser: (id: string, updateUserDataRequest: UpdateUserDataRequest) => agent.put<any>(`${BASE_URL}/${id}`,  updateUserDataRequest)
};

export default userService;
