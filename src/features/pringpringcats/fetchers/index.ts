import fetcher from "src/fetcher"

export const fetchPringPringCatsChannel: Fetcher<string> = async (params) => {
  const { callBack } = params
  try {
    const rawData = await fetcher('/pringpringcats/channel')
    callBack.onSuccess(rawData)
  } catch(error) {
    callBack.onError(error)
  }
}
