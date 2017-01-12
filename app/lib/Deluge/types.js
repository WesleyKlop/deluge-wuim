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
 * @property {?string} version
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

export type TorrentStatusFile = {
  index: number,
  offset: number,
  path: string,
  size: number,
}

export type Tracker = {
  complete_sent: boolean,
  fail_limit: number,
  fails: number,
  send_stats: boolean,
  source: number,
  start_sent: boolean,
  tier: number,
  updating: boolean,
  url: string,
  verified: boolean,
}

export type Peer = {
  client: string,
  country: string,
  down_speed: number,
  ip: string,
  progress: number,
  seed: number,
  up_speed: number,
}

export type Torrent = {
  active_time: number,
  all_time_download: number,
  comment: string,
  compact: boolean,
  distributed_copies: number,
  download_payload_rate: number,
  eta: 0,
  file_priorities: number[],
  file_progress: number[],
  files: TorrentStatusFile[],
  hash: string,
  is_auto_managed: boolean,
  is_finished: boolean,
  is_seed: true,
  label: string,
  max_connections: number,
  max_download_speed: number,
  max_upload_slots: number,
  max_upload_speed: number,
  message: string,
  move_completed: true,
  move_completed_path: string,
  move_on_completed: true,
  move_on_completed_path: string,
  name: string,
  next_announce: number,
  num_files: number,
  num_peers: number,
  num_pieces: number,
  num_seeds: 0,
  paused: boolean,
  peers: Peer[],
  piece_length: number,
  prioritize_first_last: boolean,
  'private': boolean,
  progress: number,
  queue: number,
  ratio: number,
  remove_at_ratio: number,
  save_path: string,
  seed_rank: number,
  seeding_time: number,
  seeds_peers_ratio: number,
  state: string,
  stop_at_ratio: boolean,
  stop_ratio: number,
  time_added: number,
  total_done: number,
  total_payload_download: number,
  total_payload_upload: number,
  total_peers: number,
  total_size: number,
  total_uploaded: number,
  total_wanted: number,
  tracker: string,
  tracker_host: string,
  tracker_status: string,
  trackers: Tracker[],
  upload_payload_rate: number,
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

export type AppState = {
  searchbarValue: string,
  hosts: Host[],
  torrents: Torrent[],
  session: {
    upload: number,
    download: number,
    authenticated: boolean,
    showSessionSpeed: boolean,
    selectedTorrent: ?Torrent,
  },
}
