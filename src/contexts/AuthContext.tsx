import { UserDTO } from "@dtos/userDTO";
import { api } from '@services/api'

import { storageAuthTokenSave, storageAuthTokenGet } from '@storage/storageAuthToken'

import { storageUserSave, storageUserGet, storageUserRemove } from "@storage/StoragerUser";

import { ReactNode, createContext, useEffect, useState } from "react";

export type AuthContextDataProps = {
    user: UserDTO
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    isLoadingUserStorageData: boolean;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<UserDTO>({} as UserDTO);

    const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);


    async function UserAndTokenUpdate(userData: UserDTO, token: string) {
        try {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setUser(userData);
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false)
        }
    }

    async function signIn(email: string, password: string) {
        try {
            const { data } = await api.post('/sessions', { email, password });

            if (data.user && data.token) {
                setIsLoadingUserStorageData(true)
                await storageUserSave(data.user)
                await storageAuthTokenSave(data.token)
                UserAndTokenUpdate(data.user, data.token)
            }
        }
        catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false)
        }

    }

    async function signOut() {
        try {
            setIsLoadingUserStorageData(true);
            setUser({} as UserDTO);

            await storageUserRemove();

        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    async function loadUserData() {
        try {
            const userLogged = await storageUserGet();
            const token = await storageAuthTokenGet();

            if (token && userLogged) {

                UserAndTokenUpdate(userLogged, token);
            }
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    useEffect(() => {
        loadUserData();
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            signIn,
            isLoadingUserStorageData,
            signOut

        }}>
            {children}
        </AuthContext.Provider>
    )
}