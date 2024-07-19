import { LoginUserPayload, RawUser, RegisterUserPayload } from "src/features/common/users/types/net"
import fetcher from "src/fetcher"
import { User } from "src/features/common/users/types"
import { createUserFromNet } from "src/features/common/users/factories"

export const fetchToRegister: Fetcher<{ message: string }, RegisterUserPayload> = async (params) => {
  const { inputData: payload, callBack } = params
  
  try {
    const response = await fetcher(`/users/register`, { method: 'POST', body: JSON.stringify(payload) })

    if(response.success) {
      callBack.onSuccess({message: response.message})
    } else {
      console.log('else')
      callBack.onError({message: response.message})
    }
  } catch(error) {
    console.log(error, 'error')
    callBack.onError({message: error as string})
  }
}

export const fetchToLogin: Fetcher<{
  message: string,
  data: { user: User, token: string}
}, LoginUserPayload> = async (params) => {
  const { inputData: payload, callBack } = params
  
  try {
    const response = await fetcher<{ user: RawUser, token: string}>(`/users/login`, { method: 'POST', body: JSON.stringify(payload) })

    if(response.success) {
      callBack.onSuccess({
        message: response.message,
        data: {
          user: createUserFromNet(response.data.user),
          token: response.data.token
        }
      })
    } else {
      console.log('else')
      callBack.onError({message: response.message})
    }
  } catch(error) {
    console.log(error, 'error')
    callBack.onError({message: error as string})
  }
}

export const fetchToLoginByToken: Fetcher<{
  message: string,
  data: User
}, { token: string }> = async (params) => {
  const { inputData: { token }, callBack } = params
  
  try {
    const response = await fetcher<User>('/users/auth', { headers: { authorization: `Bearer ${token}` } })

    if(response.success) {
      callBack.onSuccess({
        message: response.message,
        data: response.data
      })
    } else {
      callBack.onError({message: response.message})
    }
  } catch(error) {
    console.log(error, 'error')
    callBack.onError({message: error as string})
  }
}
