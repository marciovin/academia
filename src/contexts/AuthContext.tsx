import { UserDTO } from "@dtos/userDTO";

import { ReactNode, createContext, useState } from "react";

export type AuthContextDataProps = {
    user: UserDTO
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({children}: AuthContextProviderProps){
const [user, setUser] = useState({
    id: '1',
    name: 'Mário',
    email: 'mario@gmail.com',
    avatar: 'Mário.png'
})

 return (
    <AuthContext.Provider value={{ user }}>
        {children}
    </AuthContext.Provider>
 )   
}