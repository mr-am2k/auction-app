import { createContext} from "react";

interface AppContextInterface{
  loggedInUser: string | null,
  setLoggedInUser: (newUser: string) => void
}

const UserContext = createContext<AppContextInterface>({
  loggedInUser: null,
  setLoggedInUser: (newUser: string) => {}
});

export default UserContext;