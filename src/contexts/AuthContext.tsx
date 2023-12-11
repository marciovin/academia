import { ReactNode, createContext, useState } from "react";

import { UserDTO } from "@dtos/userDTO";

export type AuthContextDataProps = {
    user: UserDTO,
    setUser: (user: UserDTO) => void,
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthContextProvider({ children } : AuthContextProviderProps){
    const [user, setUser] = useState({
        id: '1',
        name: 'Jamalão',
        email: 'jamalão@gmail.com',
        avatar: 'jamalão.png'
      });

    return (
        <AuthContext.Provider value={{
            user, setUser
          }}>
    
            {children}
            </AuthContext.Provider>
    )
}