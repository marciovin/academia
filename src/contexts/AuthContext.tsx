import { UserDTO } from "@dtos/userDTO";
import { api } from '@services/api'



import { storageUserSave, storageUserGet } from "@storage/StoragerUser";

import { ReactNode, createContext, useEffect, useState } from "react";

export type AuthContextDataProps = {
    user: UserDTO
    signIn: (email: string, password: string) => Promise<void>;
    isLoadingUserStorageData: boolean
}

type AuthContextProviderProps = {
    children: ReactNode;
}

const [isLoadingUserStorageData, setisLoadingUserStorageData] = useState(true)

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({children}: AuthContextProviderProps){
const [user, setUser] = useState<UserDTO>({} as UserDTO)

async function signIn(email: string, password: string){
    try{
      const {data} = await api.post('/sessions', {email, password});

   if(data.user){
    setUser(data.user)
    storageUserSave(data.user);
   }
}
catch(error) {
throw error;
}

}

async function loadUserData() {
const userLogged = await storageUserGet();

if(userLogged){
setUser(userLogged);
isLoadingUserStorageData(false)
}
}

useEffect(() => {
    loadUserData();
}, [])

 return (
    <AuthContext.Provider value={{ 
    user, 
    signIn,
    isLoadingUserStorageData    
    }}> 
        {children}
    </AuthContext.Provider>
 )   
}