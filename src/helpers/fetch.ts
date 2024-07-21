export const getAPIQueryStringByOption = <ApiOption extends {[key: string]: any}>(
  option?: ApiOption
): string => {
  if (!option) {
    return ''
  }
  const keys = Object.keys(option)
  let queryString = ''
  keys.forEach((key) => {
    queryString += queryString.includes('?') ? '&' : '?'
    if (Array.isArray(option[key])) {
      const arrayParam = option[key] as Array<string | number>
      const encodedArray = arrayParam.map((item) => encodeURIComponent(item))
      queryString += `${key}=${encodedArray.join(',')}`
    } else {
      queryString += `${key}=${option[key]}`
    }
  })
  return queryString
}

export const getErrorTypeByStatusCode = (code: APIStatusCode): ErrorType => {
  switch (code) {
    case 500:
      return 'error'
    default:
      return 'warning'
  }
}
