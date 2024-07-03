const fetcher = async (url: string, init?: RequestInit) => {
  try {
    const apiPath = process.env.NEXT_PUBLIC_SITE_URL + '/api' + url;
    const response = await fetch(apiPath, init)
    const rawData = await response.json()

    return rawData
  } catch(error) {
    throw error;
  }
}

export default fetcher
