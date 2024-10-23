import { User } from "firebase/auth";
import { createContext, Dispatch, SetStateAction, useState } from "react";

interface UserContextData {
  user?: User;
  setUser: Dispatch<SetStateAction<User | undefined>>;
}

export const UserContext = createContext({} as UserContextData);

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
