// @flow
import type { Host } from '../api/types'
import Deluge from '../api/Deluge'

export const HOST_ADDED = 'HOST_ADDED'
export const REQUEST_ADD_HOST = 'REQUEST_ADD_HOST'
export const HOST_REMOVED = 'HOST_REMOVED'
export const REQUEST_REMOVE_HOST = 'REQUEST_REMOVE_HOST'
export const REQUEST_HOSTS = 'REQUEST_HOSTS'
export const RECEIVE_HOSTS = 'RECEIVE_HOSTS'
export const REQUEST_HOST_STATUS = 'REQUEST_HOST_STATUS'
export const RECEIVE_HOST_STATUS = 'RECEIVE_HOST_STATUS'

export const hostAdded = (success: boolean) => ({
  type: HOST_ADDED,
  success,
})

export const hostRemoved = (success: boolean) => ({
  type: HOST_REMOVED,
  success,
})

export const requestAddHost = () => ({
  type: REQUEST_ADD_HOST,
})

export const requestRemoveHost = () => ({
  type: REQUEST_REMOVE_HOST,
})

export const requestHosts = () => ({
  type: REQUEST_HOSTS,
})

export const receiveHosts = (hosts: Host[]) => ({
  type: RECEIVE_HOSTS,
  hosts,
})

export const requestHostStatus = (id: string) => ({
  type: REQUEST_HOST_STATUS,
  id,
})

export const receiveHostStatus = (host: Host) => ({
  type: RECEIVE_HOST_STATUS,
  host,
})

export const fetchHostStatus = (id: string) =>
  (dispatch: Dispatch, getState: () => Host[], deluge: Deluge) => {
    dispatch(requestHostStatus(id))
    return deluge.web.getHostStatus(id)
      .then((host: Host) => dispatch(receiveHostStatus(host)))
  }

export const fetchHosts = () => (dispatch: Dispatch, getState: () => Host[], deluge: Deluge) => {
  dispatch(requestHosts())
  return deluge.web.getHosts()
    .then((hosts: Host[]) => {
      dispatch(receiveHosts(hosts))
      hosts.forEach(host => dispatch(fetchHostStatus(host.id)))
    })
}

export const addHost = (ip: string, port: number, username: string, password: string) =>
  (dispatch: Dispatch, getState: () => Host[], deluge: Deluge) => {
    dispatch(requestAddHost())
    return deluge.web.addHost(ip, port, username, password)
      .then((res: boolean) => {
        dispatch(hostAdded(res))
        dispatch(fetchHosts())
        return res
      })
  }

export const removeHost = (id: string) =>
  (dispatch: Dispatch, getState: () => Host[], deluge: Deluge) => {
    dispatch(requestRemoveHost())
    return deluge.web.removeHost(id)
      .then((res: boolean) => {
        dispatch(hostRemoved(res))
        dispatch(fetchHosts())
        return res
      })
  }
