const baseFetcher = async <RawData = any, ErrorField = {}>(url: string, init?: RequestInit) => {
  try {
    const apiPath = process.env.NEXT_PUBLIC_SITE_URL + '/api' + url;
    const response = await fetch(apiPath, init)
    const rawData = await response.json() as APIResponse<RawData, ErrorField>

    return rawData
  } catch(error) {
    throw error;
  }
}

export default baseFetcher
