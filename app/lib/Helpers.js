/* eslint-disable import/prefer-default-export */

export const bytesToSize = (bytes: number, noExtension: boolean = false): string => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 Byte'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
  return `${Math.round(bytes / (1024 ** i), 2)}${noExtension ? '' : ` ${sizes[i]}`}`
}

export const timestampToFormat = (timestamp: number): string => {
  const date = new Date(timestamp * 1000)

  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`
}

export const formatTwoDigits = (num: number) => num.toString().padStart(2, '0')

export const timestampToRange = (timestamp: number): string => {
  let delta = timestamp

  const days = Math.floor(delta / 86400)
  delta -= days * 86400

  const hours = Math.floor(delta / 3600) % 24
  delta -= hours * 3600

  const minutes = Math.floor(delta / 60) % 60
  delta -= minutes * 60

  const seconds = Math.floor(delta % 60)

  return `${days} days, ${formatTwoDigits(hours)}:${formatTwoDigits(minutes)}:${formatTwoDigits(seconds)}`
}

export const formatNumber = (n, digits = 2) => {
  if (n <= 0) {
    return 0
  }
  return n.toFixed(digits)
}
