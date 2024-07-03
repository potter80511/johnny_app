export const convertUnitForChannelInfo = (rawValue: number) => {
  const numberValue = Number(rawValue)
  if (numberValue >= 1e+4) {
    return `${(numberValue / 1e+4).toFixed()}萬 (${numberValue.toLocaleString()})`
  } else {
    return numberValue
  }
}

export const convertCountUnit = (rawValue: number | string) => {
  const numberValue = Number(rawValue)
  if (numberValue >= 1e+4) {
    return `${(numberValue / 1e+4).toFixed().toLocaleString()}萬`
  } else {
    return numberValue.toLocaleString()
  }
}

export function urlify(text: string) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function(url) {
    return '<a href="' + url + '" target="_blank">' + url + '</a>';
  })
}
