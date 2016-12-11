// @flow
import type { Host } from '../api/types'

export const ADD_HOST = 'ADD_HOST'
export const REMOVE_HOST = 'REMOVE_HOST'
export const REQUEST_HOSTS = 'REQUEST_HOSTS'
export const RECEIVE_HOSTS = 'RECEIVE_HOSTS'
export const REQUEST_HOST_STATUS = 'REQUEST_HOST_STATUS'
export const RECEIVE_HOST_STATUS = 'RECEIVE_HOST_STATUS'

export const addHost = (ip: string, port: number, username: string, password: string) => ({
  type: ADD_HOST,
  ip,
  port,
  username,
  password,
})

export const removeHost = (id: string) => ({
  type: REMOVE_HOST,
  id,
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
