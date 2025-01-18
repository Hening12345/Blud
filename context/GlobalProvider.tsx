import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { getCurrentUser } from "../lib/appwrite";

interface GlobalProviderProps {
  children: ReactNode;
}

interface User {
    accountId: string;
    email: string;
    username: string;
    avatar: string;
  }

interface GlobalContextType {
    isLoggedIn: boolean;
    user: any | null;
    isLoading: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    setUser: (user: any | null) => void;
  }

interface User {
    accountId: string;
    email: string;
    username: string;
    avatar: string;
  }

const GlobalContext = createContext<GlobalContextType | null>(null);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res:any) => {
        if (res) {
          setUser(res);
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser, isLoading }}
    >
      {children}
    </GlobalContext.Provider>
  );
};


export default GlobalProvider;