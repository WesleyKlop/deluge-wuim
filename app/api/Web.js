class Web {
  /**
   * Web constructor
   * @param {Deluge} deluge
   * @constructor
   */
  constructor(deluge) {
    this.deluge = deluge
  }

  /**
   * Add torrents by file
   * @param {{path: string, options: Object}[]} torrents
   * @returns {Promise.<boolean>}} true on success
   */
  addTorrents(torrents) {
    return this.deluge.call('web.add_torrents', torrents)
  }

  /**
   * Connect to a deluge daemon
   * @param {Host.id} hostId the id of the host to connect to
   * @returns {Promise.<null>}
   */
  connect(hostId) {
    return this.deluge.call('web.connect', hostId)
  }

  /**
   * Returns true if the web ui is connected to the daemon
   * @returns {Promise.<boolean>}
   */
  connected() {
    return this.deluge.call('web.connected')
  }

  /**
   * Remove an event listener from the queue
   * @param {string} eventName the event to remove
   * @returns {Promise.<null>}
   */
  deregisterEventListener(eventName) {
    return this.deluge.call('web.deregister_event_listener', eventName)
  }

  /**
   * Disconnect from the current daemon
   * @returns {Promise.<boolean>} true on a successful disconnect
   */
  disconnect() {
    return this.deluge.call('web.disconnect')
  }

  /**
   * Download a torrent file to a temp directory
   * @param {string} url the location of the torrent
   * @param {string=} cookie optional cookies to add to the request
   * @returns {Promise.<string>} the location where the torrent file is saved
   */
  downloadTorrentFromUrl(url, cookie = '') {
    return this.deluge.call('web.download_torrent_from_url', url, cookie)
  }

  /**
   * @name Filter
   * @property {string} state
   * @property {string} tracker_host
   * @property {string} label
   */

  /**
   * Get a list of torrents filtered by filter
   * @param {string[]=} fields
   * @param {Filter=} filter
   * @returns {Promise.<Object>}
   */
  updateUi(fields = [], filter) {
    return this.deluge.call('web.update_ui', fields, filter || {})
  }

  /**
   * @name Host an object containing information for connecting to a deluge daemon
   * @property {string} id the host ID
   * @property {string} ip the host IP
   * @property {number} port the host PORT
   * @property {string} status the host status (online or offline)
   */

  /**
   * Get an array of available hosts
   * @returns {Promise.<Host[]>} array with hosts
   */
  getHosts() {
    return this.deluge.call('web.get_hosts')
      .then(hosts => hosts.map(([id, ip, port, status]) => ({ id, ip, port, status })))
  }

  /**
   * @name HostWithVersion
   * @extends Host
   * @property {string} version the deluge version running on the host
   */

  /**
   * Get the status from a host
   * @param {Host.id} hostId id of host to get information from
   * @returns {Promise.<HostWithVersion>}
   */
  getHostStatus(hostId) {
    return this.deluge.call('web.get_host_status', hostId)
      .then(([id, ip, port, status, version]) => ({ id, ip, port, status, version }))
  }

  /**
   * @name TorrentInfo
   * @property {string} name the torrent name
   * @property {string} info_hash the torrents info hash
   * @property {?Object} an object containing the torrent file structure (null for magnet URL's)
   */

  /**
   * Get information from a torrent file on the file system
   * @param {string} torrentPath the absolute path to the torrent on the file system
   * @returns {Promise.<TorrentInfo>}
   */
  getTorrentInfo(torrentPath) {
    return this.deluge.call('web.get_torrent_info', torrentPath)
  }

  /**
   * Get information about a magnet link
   * @param {string} torrentUri the magnet uri
   * @returns {Promise.<TorrentInfo>}
   */
  getMagnetInfo(torrentUri) {
    return this.deluge.call('web.get_magnet_info', torrentUri)
  }

  /**
   * Get an object containing the available and enabled plugins
   * @returns {Promise.<{available_plugins: string[],enabled_plugins: string[] }>}
   */
  getPlugins() {
    return this.deluge.call('web.get_plugins')
  }

  /**
   * Get information about a torrent by Id
   * @param {string} torrentId
   * @param {string[]=} keys
   * @returns {Promise.<Object>}
   */
  getTorrentStatus(torrentId, keys = []) {
    return this.deluge.call('web.get_torrent_status', torrentId, keys)
  }

  /**
   * Get the web configuration
   * @returns {Promise.<Object>} the web configuration
   */
  getConfig() {
    return this.deluge.call('web.get_config')
  }

  /**
   * Get the resource locations for a plugin. Returns null if the plugin is not found
   * @useless
   * @param {string} pluginName
   * @returns {Promise.<?{debug_scripts: string[], scripts: string[]}>}
   */
  getPluginResources(pluginName) {
    return this.deluge.call('web.get_plugin_resources', pluginName)
  }

  /**
   * Get the pending events for the session
   * @returns {Promise.<?string[]>}
   */
  getEvents() {
    return this.deluge.call('web.get_events')
  }

  /**
   * Get a file tree of the contents of a torrent
   * @param torrentId
   * @returns {Promise.<Object>}
   */
  getTorrentFiles(torrentId) {
    return this.deluge.call('web.get_torrent_files', torrentId)
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

  /**
   * Get information on a plugin
   * @param {string} pluginName
   * @returns {Promise.<PluginInfo>}
   */
  getPluginInfo(pluginName) {
    return this.deluge.call('web.get_plugin_info', pluginName)
  }

  /**
   * Remove a host from the web ui
   * @param {Host.id} hostId the id of the host to remove
   * @returns {Promise.<boolean>} if the removal was successful
   */
  removeHost(hostId) {
    return this.deluge.call('web.remove_host', hostId)
  }

  /**
   * Add a listene to the queue
   * @param {string} eventName the name of the event to listen for
   * @returns {Promise.<null>}
   */
  registerEventListener(eventName) {
    return this.deluge.call('web.register_event_listener', eventName)
  }

  /**
   * Add a host to the web ui
   * @param {Host.ip} ip the ip of the host
   * @param {Host.port} port the port of the host
   * @param {string} username the username to connect with
   * @param {string} password the password to connect with
   * @returns {Promise.<boolean>} true if the addition was successful
   */
  addHost(ip, port, username, password) {
    return this.deluge.call('web.add_host', ip, port, username, password)
      .then(result => result[0])
  }

  /**
   * Start a local daemon
   * @param {number} port
   * @returns {Promise.<bool>}
   */
  startDaemon(port) {
    return this.deluge.call('web.start_daemon', port)
  }

  /**
   * Stop a running daemon
   * @param {Host.id} hostId
   * @returns {Promise.<bool>}
   */
  stopDaemon(hostId) {
    return this.deluge.call('web.stop_daemon', hostId)
  }

  /**
   * Upload a plugin to the web ui
   * @param {string} filename name of the plugin file
   * @param {string} path path to the plugin file
   * @returns {Promise.<bool>} true if the upload was success
   */
  uploadPlugin(filename, path) {
    return this.deluge.call('web.upload_plugin', filename, path)
  }
}

export default Web
