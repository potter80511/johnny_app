export const convertUnit = (rawValue: number) => {
  const numberValue = Number(rawValue)
  if (numberValue >= 1e+4) {
    return `${(numberValue / 1e+4).toFixed()}萬 (${numberValue.toLocaleString()})`
  } else {
    return numberValue
  }
}
