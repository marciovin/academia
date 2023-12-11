import { UserDTO } from "@dtos/UserDTO";
import { ReactNode, createContext, useState } from "react";

export type AuthContextDataProps = {
    user: UserDTO
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
            user
          }}>
    
            {children}
            </AuthContext.Provider>
    )
}