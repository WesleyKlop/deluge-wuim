class Core {
  /**
   * Core constructor
   * @param {Deluge} deluge
   */
  constructor(deluge) {
    this.deluge = deluge
  }

  /**
   * Get a list of available plugins
   * @returns {Promise<Array<string>>} an array of available plugins
   */
  getAvailablePlugins() {
    return this.deluge.call('core.get_available_plugins')
  }

  /**
   * Get the cache status
   * @returns {Promise<Object.Number>} cache statistics
   */
  getCacheStatus() {
    return this.deluge.call('core.get_cache_status')
  }

  /**
   * Get the deluge configuration
   * @returns {Promise.<Object.*>}
   */
  getConfig() {
    return this.deluge.call('core.get_config')
  }

  /**
   * Get a value from the deluge config
   * @param {string} key
   * @returns {Promise.<*>} the value assigned to the key
   */
  getConfigValue(key) {
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
  getConfigValues(...keys) {
    if (!keys.length) {
      throw new TypeError('Expecting at least one value to be requested')
    }
    if (keys.length === 1) {
      // eslint-disable-next-line no-console
      console.warn('Calling getConfigValues with only one parameter, might as well use getConfigValue instead')
    }
    return this.deluge.call('core.get_config_values', [keys])
  }

  /**
   * Get an array with the names of the enabled plugins
   * @returns {Promise.<Array<string>>} the array of enabled plugins
   */
  getEnabledPlugins() {
    return this.deluge.call('core.get_enabled_plugins')
  }

  /**
   * @typedef {Array} Filter
   * @property {string} name name the name of the filter
   * @property {number} amount amount of torrents in filter
   */

  /**
   * @typedef {Object} FilterTree
   * @property {Filter[]} label
   * @property {Filter[]} state
   * @property {Filter[]} tracker_host
   */

  /**
   * Get an object with available filters
   * @returns {Promise.<FilterTree>}
   */
  getFilterTree() {
    return this.deluge.call('core.get_filter_tree')
  }

  /**
   * Get the free disk space in bytes
   * @returns {Promise.<number>}
   */
  getFreeSpace() {
    return this.deluge.call('core.get_free_space')
  }

  /**
   * Get the Libtorrent version
   * @returns {Promise.<string>}
   */
  getLibtorrentVersion() {
    return this.deluge.call('core.get_libtorrent_version')
  }

  /**
   * Get the port that deluge is listening on
   * @returns {Promise.<number>}
   */
  getListenPort() {
    return this.deluge.call('core.get_listen_port')
  }

  /**
   * Get the amount of connections
   * @returns {Promise.<number>}
   */
  getNumConnections() {
    return this.deluge.call('core.get_num_connections')
  }

  /**
   * Get the size of a file path on the server
   * @param {string} path
   * @returns {Promise.<number>}
   */
  getPathSize(path) {
    if (!path || typeof path !== 'string') {
      throw new TypeError(`Expected parameter path of type string but got ${typeof path}`)
    }
    return this.deluge.call('core.get_path_size', [path])
  }

  /**
   * Get a list of all torrent ID's
   * @returns {Promise.<string>} array of all torrent ID's
   */
  getSessionState() {
    return this.deluge.call('core.get_session_state')
  }

  /**
   * @see http://www.rasterbar.com/products/libtorrent/manual.html#status
   * @param {string[]} keys to return
   * @returns {Promise.<Object>} an object with the specified keys
   */
  getSessionStatus(...keys) {
    return this.deluge.call('core.get_session_status', [keys])
  }

  /**
   * Receive a dictionary of the torrent with id torrentId
   * @param {string} torrentId
   * @param {string[]=} keys (To see available keys call this function with an empty array)
   * @returns {Promise.<Object>} the object with the specified keys
   */
  getTorrentStatus(torrentId, keys = []) {
    return this.deluge.call('core.get_torrent_status', [torrentId, keys])
  }

  /**
   * Get a list of torrent values, optionally filtered by filterDict
   * @param {Object.<string,string>=} filterDict the keys to filter with
   * @param {string[]=} keys the requested keys
   * (To see available keys call this function with an empty array)
   * @returns {Promise.<Object.<string, Object>>}
   */
  getTorrentsStatus(filterDict = {}, keys = []) {
    return this.deluge.call('core.get_torrents_status', [filterDict, keys])
  }
}

export default Core
