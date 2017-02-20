// @flow
import Deluge from './Deluge'
import type { FilterTree, Torrent } from './types'

class Core {
  deluge: Deluge

  /**
   * Core constructor
   * @param {Deluge} deluge
   */
  constructor(deluge: Deluge) {
    this.deluge = deluge
  }

  /**
   * Get a list of available plugins
   * @returns {Promise<Array<string>>} an array of available plugins
   */
  getAvailablePlugins(): Promise<string[]> {
    return this.deluge.call('core.get_available_plugins')
  }

  /**
   * Get the cache status
   * @returns {Promise<Object.Number>} cache statistics
   */
  getCacheStatus(): Promise<Object> {
    return this.deluge.call('core.get_cache_status')
  }

  /**
   * Get the deluge configuration
   * @returns {Promise.<Object.*>}
   */
  getConfig(): Promise<Object> {
    return this.deluge.call('core.get_config')
  }

  /**
   * Get a value from the deluge config
   * @param {string} key
   * @returns {Promise.<*>} the value assigned to the key
   */
  getConfigValue(key: string): Promise<any> {
    if (key && typeof key === 'string') {
      return this.deluge.call('core.get_config_value', [key])
    }
    throw new TypeError(`Expected parameter 'key' of type string but got "${typeof key}"`)
  }

  /**
   * Get multiple key-value pairs from the deluge config
   * @param {Array<string>} keys
   * @returns {Promise<Object>} the key-value pairs for the requested keys
   */
  getConfigValues(...keys: string[]): Promise<Object> {
    if (!keys.length) {
      throw new TypeError('Expecting at least one value to be requested')
    }
    if (keys.length === 1) {
      // eslint-disable-next-line no-console
      console.warn('Calling getConfigValues with only one parameter, might as well use getConfigValue instead')
    }
    return this.deluge.call('core.get_config_values', keys)
  }

  /**
   * Get an array with the names of the enabled plugins
   * @returns {Promise.<Array<string>>} the array of enabled plugins
   */
  getEnabledPlugins(): Promise<string[]> {
    return this.deluge.call('core.get_enabled_plugins')
  }

  /**
   * Get an object with available filters
   * @returns {Promise.<FilterTree>}
   */
  getFilterTree(): Promise<FilterTree> {
    return this.deluge.call('core.get_filter_tree')
  }

  /**
   * Get the free disk space in bytes
   * @returns {Promise.<number>}
   */
  getFreeSpace(): Promise<number> {
    return this.deluge.call('core.get_free_space')
  }

  /**
   * Get the Libtorrent version
   * @returns {Promise.<string>}
   */
  getLibtorrentVersion(): Promise<string> {
    return this.deluge.call('core.get_libtorrent_version')
  }

  /**
   * Get the port that deluge is listening on
   * @returns {Promise.<number>}
   */
  getListenPort(): Promise<number> {
    return this.deluge.call('core.get_listen_port')
  }

  /**
   * Get the amount of connections
   * @returns {Promise.<number>}
   */
  getNumConnections(): Promise<number> {
    return this.deluge.call('core.get_num_connections')
  }

  /**
   * Get the size of a file path on the server
   * @param {string} path
   * @returns {Promise.<number>}
   */
  getPathSize(path: string): Promise<number> {
    if (!path || typeof path !== 'string') {
      throw new TypeError(`Expected parameter path of type string but got ${typeof path}`)
    }
    return this.deluge.call('core.get_path_size', path)
  }

  /**
   * Get a list of all torrent ID's
   * @returns {Promise.<string>} array of all torrent ID's
   */
  getSessionState(): Promise<string> {
    return this.deluge.call('core.get_session_state')
  }

  /**
   * @see http://www.rasterbar.com/products/libtorrent/manual.html#status
   * @param {string[]} keys to return
   * @returns {Promise.<Object>} an object with the specified keys
   */
  getSessionStatus(...keys: string[]): Promise<Object> {
    return this.deluge.call('core.get_session_status', keys)
  }

  /**
   * Receive a dictionary of the torrent with id torrentId
   * The difference between this and {@link Web#getTorrentStatus} is
   * that {@link Web#getTorrentStatus} can also give you the torrent label
   * @param {string} torrentId
   * @param {string[]=} keys (To see available keys call this function with an empty array)
   * @returns {Promise.<Torrent>} the object with the specified keys
   */
  getTorrentStatus(torrentId: string, keys?: string[]): Promise<Torrent> {
    return this.deluge.call('core.get_torrent_status', torrentId, keys || [])
  }

  /**
   * Get a list of torrent values, optionally filtered by filterDict
   * @param {Object.<string,string>=} filterDict the keys to filter with
   * @param {string[]=} keys the requested keys
   * (To see available keys call this function with an empty array)
   * @returns {Promise.<Object.<string, Object>>}
   */
  getTorrentsStatus(filterDict: Object = {}, keys?: string[]): Promise<Object> {
    return this.deluge.call('core.get_torrents_status', filterDict, keys || [])
  }

  resumeTorrent(...ids: string[]): Promise<null> {
    return this.deluge.call('core.resume_torrent', ids)
  }

  pauseTorrent(...ids: string[]): Promise<null> {
    return this.deluge.call('core.pause_torrent', ids)
  }
}

export default Core
