import AsyncStorage from '@react-native-async-storage/async-storage'
import { AUTH_TOKEN_STORAGE } from '@storage/storadeConfig'

type StorageAuthTokenProps = {
  token: string
  refreshtoken: string
}

export async function storageAuthTokenSave({
  token,
  refreshtoken,
}: StorageAuthTokenProps) {
  await AsyncStorage.setItem(
    AUTH_TOKEN_STORAGE,
    JSON.stringify({ token, refreshtoken }),
  )
}

export async function storageAuthTokenGet() {
  const response = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE)

  const { token, refreshtoken }: StorageAuthTokenProps = response
    ? JSON.parse(response)
    : {}

  return { token, refreshtoken }
}

export async function storageAthTokenRemove() {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE)
}
