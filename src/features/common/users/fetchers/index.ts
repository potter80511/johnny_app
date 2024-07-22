import { LoginUserPayload, RawUser, RegisterUserPayload } from "src/features/common/users/types/net"
import baseFetcher from "src/fetcher"
import { User } from "src/features/common/users/types"
import { createUserFromNet } from "src/features/common/users/factories"
import { getErrorTypeByStatusCode } from "src/helpers/fetch"
import { Form as LoginFormType } from "src/features/common/Header/UserLogin/LoginForm"

export const fetchToRegister: FetcherWithCallBack<{ message: string }, RegisterUserPayload> = async (params) => {
  const { inputData: payload, callBack } = params
  
  try {
    const response = await baseFetcher(`/users/register`, { method: 'POST', body: JSON.stringify(payload) })

    if(response.success) {
      callBack.onSuccess({message: response.message})
    } else {
      callBack.onError({
        message: response.message,
        type: getErrorTypeByStatusCode(response.status_code)
      })
    }
  } catch(error) {
    console.log(error, 'error')
    callBack.onError({
      message: error as string,
      type: 'error'
    })
  }
}

export const fetchToLogin: FetcherWithCallBack<
  {
    message: string,
    data: { user: User, token: string}
  },
  LoginUserPayload,
  Partial<LoginFormType>
> = async (params) => {
  const { inputData: payload, callBack } = params
  
  try {
    const response = await baseFetcher<
      { user: RawUser, token: string},
      Partial<LoginFormType>
    >(`/users/login`, { method: 'POST', body: JSON.stringify(payload) })

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
      callBack.onError({
        message: response.message,
        type: getErrorTypeByStatusCode(response.status_code),
        field: { ...response.error?.field }
      })
    }
  } catch(error) {
    console.log(error, 'error')
    callBack.onError({message: error as string, type: 'error'})
  }
}

export const fetchToLoginByToken: FetcherWithCallBack<{
  message: string,
  data: User
}, { token: string }> = async (params) => {
  const { inputData: { token }, callBack } = params
  
  try {
    const response = await baseFetcher<User>('/users/auth', { headers: { authorization: `Bearer ${token}` } })

    if(response.success) {
      callBack.onSuccess({
        message: response.message,
        data: response.data
      })
    } else {
      callBack.onError({
        message: response.message,
        type: getErrorTypeByStatusCode(response.status_code)
      })
    }
  } catch(error) {
    console.log(error, 'error')
    callBack.onError({
      message: error as string,
      type: 'error'
    })
  }
}
