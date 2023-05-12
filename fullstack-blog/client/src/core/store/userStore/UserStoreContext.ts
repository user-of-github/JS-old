import React from 'react';
import UserStore from './UserStore';


const UserStoreContext = React.createContext<typeof UserStore>(UserStore);
export const useUserStore = () => React.useContext(UserStoreContext);
