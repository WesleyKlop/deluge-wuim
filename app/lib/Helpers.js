/* eslint-disable import/prefer-default-export */

export const bytesToSize = (bytes: number, noExtension = false): string => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 Byte'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
  return `${Math.round(bytes / (1024 ** i), 2)}${noExtension ? '' : ` ${sizes[i]}`}`
}
