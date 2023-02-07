import agent from 'lib/agent';
import { User } from 'models/user';
import { UpdateUserDataRequest } from 'models/request/update/updateUserDataRequest';
import { CheckIfUserExists } from 'models/request/check/checkIfUserExists';

const BASE_URL = '/users';

const userService = {
  deactivate: () => agent.post<any>(`${BASE_URL}/current/deactivate`, {}),
  getUser: (userId: string) => agent.get<User>(`${BASE_URL}/current/${userId}`),
  updateUser: (id: string, updateUserDataRequest: UpdateUserDataRequest) => agent.put<any>(`${BASE_URL}/${id}`, updateUserDataRequest),
  checkIfUserExists: (checkIfUserExists: CheckIfUserExists) => agent.post<boolean>(`${BASE_URL}/check-if-exists`, checkIfUserExists),
};

export default userService;
