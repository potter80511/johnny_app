export const convertUnitForChannelInfo = (rawValue: number) => {
  const numberValue = Number(rawValue)
  if (numberValue >= 1e+4) {
    return `${(numberValue / 1e+4).toFixed()}萬 (${numberValue.toLocaleString()})`
  } else {
    return numberValue
  }
}

export const convertViewCountUnit = (rawValue: number | string) => {
  const numberValue = Number(rawValue)
  if (numberValue >= 1e+4) {
    return `${(numberValue / 1e+4).toFixed()}萬`
  } else {
    return numberValue.toLocaleString()
  }
}
