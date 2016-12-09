// @flow
import type { Host } from '../api/types'

const ADD_HOST = 'ADD_HOST'
const REMOVE_HOST = 'REMOVE_HOST'
const REQUEST_HOSTS = 'REQUEST_HOSTS'
const RECEIVE_HOSTS = 'RECEIVE_HOSTS'
const REQUEST_HOST_STATUS = 'REQUEST_HOST_STATUS'
const RECEIVE_HOST_STATUS = 'RECEIVE_HOST_STATUS'

const addHost = (ip: string, port: number, username: string, password: string) => ({
  type: ADD_HOST,
  ip,
  port,
  username,
  password,
})

const removeHost = (id: string) => ({
  type: REMOVE_HOST,
  id,
})

const requestHosts = () => ({
  type: REQUEST_HOSTS,
})

const receiveHosts = (hosts: Host[]) => ({
  type: RECEIVE_HOSTS,
  hosts,
})

const requestHostStatus = (id: string) => ({
  type: REQUEST_HOST_STATUS,
  id,
})

const receiveHostStatus = (host: Host) => ({
  type: RECEIVE_HOST_STATUS,
  host,
})

export {
  ADD_HOST,
  REMOVE_HOST,
  REQUEST_HOSTS,
  RECEIVE_HOSTS,
  REQUEST_HOST_STATUS,
  RECEIVE_HOST_STATUS,
  addHost,
  removeHost,
  requestHosts,
  requestHostStatus,
  receiveHosts,
  receiveHostStatus,
}
