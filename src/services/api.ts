import { storageAuthTokenGet, storageAuthTokenSave } from '@storage/storageAuthToken'
import { AppError } from '@utils/AppError'
import axios, { AxiosError, AxiosInstance } from 'axios'

type SignOut = () => void

type PromiseType = {
  onSucess: (token: string) => void
  onFalied: (error: AxiosError) => void
}

type APIInstance = AxiosInstance & {
  registerInterceptorTokenManager: (signOut: SignOut) => () => void
}

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
}) as APIInstance

let failedQueue: Array<PromiseType> = []
let isRefreshing = false

api.registerInterceptorTokenManager = (signOut) => {
  const interceptorTokenManager = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      if (requestError?.response?.status === 401) {
        if (
          requestError.response.data?.message === 'token.expired' ||
          requestError.response.data?.message === 'token.invalid'
        ) {
          const { refreshtoken } = await storageAuthTokenGet()

          if (!refreshtoken) {
            signOut()
            return Promise.reject(requestError)
          }

          const originalRequestConfig = requestError.config

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({
                onSucess: (token: string) => {
                  originalRequestConfig.headers = {
                    Authorization: `Bearer ${token}`,
                  }
                  resolve(api(originalRequestConfig))
                },
                onFalied: (error: AxiosError) => {
                  reject(error)
                },
              })
            })
          }

          isRefreshing = true

          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await api.post('/sessions/refresh-token', { refreshtoken })
              await storageAuthTokenSave({ token: data.token, refreshtoken: data.refreshtoken })

              if (originalRequestConfig.data) {
                originalRequestConfig.data = JSON.parse(originalRequestConfig.data)
              }

              originalRequestConfig.headers = {
                Authorization: `Bearer ${data.token}`,
              }
              api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`

              failedQueue.forEach(request => {
                request.onSucess(data.token)
              })
              console.log("TOKEN ATUALIZADO")
              resolve(api(originalRequestConfig))

            } catch (error: any) {
              failedQueue.forEach(request => {
                request.onFalied(error);
              });
              signOut();
              reject(error)
            } finally {
              isRefreshing = false;
              failedQueue = []
            }
          })
        }
        signOut()
      }

      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message))
      } else {
        return Promise.reject(requestError)
      }
    },
  )
  return () => api.interceptors.response.eject(interceptorTokenManager)
}

export { api }
