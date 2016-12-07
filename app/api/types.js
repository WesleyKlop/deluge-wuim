// @flow
/**
 * @typedef {Array} Filter
 * @property {string} name name the name of the filter
 * @property {number} amount amount of torrents in filter
 */
export type Filter = {
  name: string,
  amount: number,
}

/**
 * @typedef {Object} FilterTree
 * @property {Filter[]} label
 * @property {Filter[]} state
 * @property {Filter[]} tracker_host
 */
export type FilterTree = {
  label: Filter[],
  state: Filter[],
  tracker_host: Filter[],
}

/**
 * @name Host an object containing information for connecting to a deluge daemon
 * @property {string} id the host ID
 * @property {string} ip the host IP
 * @property {number} port the host PORT
 * @property {string} status the host status (online or offline)
 * @property {version} version
 */
export type Host = {
  id: string,
  ip: string,
  port: number,
  status: 'Online' | 'Offline' | 'Connected',
  version?: string
}

/**
 * @name TorrentInfo
 * @property {string} name the torrent name
 * @property {string} info_hash the torrents info hash
 * @property {?Object} an object containing the torrent file structure (null for magnet URL's)
 */
export type TorrentInfo = {
  name: string,
  info_hash: string,
  tree?: Object
}

/**
 * @name PluginInfo
 * @property {string} Author
 * @property {string} Author-email
 * @property {string} Description
 * @property {string} Home-page
 * @property {string} License
 * @property {string} Name
 * @property {string} Platform
 * @property {string} Summary
 * @property {string} Version
 */
export type PluginInfo = {
  Author: string,
  'Author-email': string,
  Description: string,
  'Home-page': string,
  License: string,
  Name: string,
  Platform: string,
  Summary: string,
  Version: string,
}
