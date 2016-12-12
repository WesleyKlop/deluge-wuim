// @flow
export const RECEIVE_SESSION_SPEED = 'RECEIVE_SESSION_SPEED'
export const SHOW_SESSION_SPEED = 'SHOW_SESSION_SPEED'

export const receiveStats = (download: number, upload: number) => ({
  type: RECEIVE_SESSION_SPEED,
  download,
  upload,
})

export const setShowSessionSpeed = (show: boolean) => ({
  type: SHOW_SESSION_SPEED,
  show,
})
