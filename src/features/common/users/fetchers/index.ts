import { RegisterUserPayload } from "src/features/common/users/types/net"
import fetcher from "src/fetcher"

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
