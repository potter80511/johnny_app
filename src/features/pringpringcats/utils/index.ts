export const convertUnit = (rawValue: number) => {
  if (rawValue >= 1e+4) {
    return rawValue / 1e+4 + '萬'
  } else {
    return rawValue
  }
}
