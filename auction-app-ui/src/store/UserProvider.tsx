import { useState } from 'react';
import UserContext from './user-context';


type Props = {
  children?: React.ReactNode;
};

const UserProvider: React.FC<Props> = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState<string | null>('muamer');

    return(
        <UserContext.Provider value={{loggedInUser, setLoggedInUser}}>
            {children}
        </UserContext.Provider>
    )

};

export default UserProvider;
