import baseFetcher from "src/fetcher"
import { getErrorTypeByStatusCode } from "src/helpers/fetch"
import { CreateRideCheckedInPayload } from "src/features/ride_check_in/types/net"
import { Cookies } from "react-cookie";

export const fetchToCheckIn: FetcherWithCallBack<{ message: string }, CreateRideCheckedInPayload> = async (params) => {
  const { inputData: payload, callBack } = params
  
  const cookies = new Cookies();
  const token = cookies.get('user_token')
  
  try {
    const response = await baseFetcher(`/ride/check_in`, {
      method: 'POST',
      headers: { authorization: `Bearer ${token}`},
      body: JSON.stringify(payload)
    })

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

