// @flow
import Deluge from './Deluge'
import type { FilterTree, TorrentInfo, PluginInfo, Host, Torrent } from './types'

class Web {
  deluge: Deluge

  /**
   * Web constructor
   * @param {Deluge} deluge
   * @constructor
   */
  constructor(deluge: Deluge) {
    this.deluge = deluge
  }

  /**
   * Add torrents by file
   * @param {{path: string, options: Object}[]} torrents
   * @returns {Promise.<boolean>}} true on success
   */
  addTorrents(torrents: { path: string, options: Object }[]): Promise<boolean> {
    return this.deluge.call('web.add_torrents', torrents)
  }

  /**
   * Connect to a deluge daemon
   * @param {Host.id} hostId the id of the host to connect to
   * @returns {Promise.<null>}
   */
  connect(hostId: string): Promise<void> {
    return this.deluge.call('web.connect', hostId)
  }

  /**
   * Returns true if the web ui is connected to the daemon
   * @returns {Promise.<boolean>}
   */
  connected(): Promise<boolean> {
    return this.deluge.call('web.connected')
  }

  /**
   * Remove an event listener from the queue
   * @param {string} eventName the event to remove
   * @returns {Promise.<null>}
   */
  deregisterEventListener(eventName: string): Promise<void> {
    return this.deluge.call('web.deregister_event_listener', eventName)
  }

  /**
   * Disconnect from the current daemon
   * @returns {Promise.<boolean>} true on a successful disconnect
   */
  disconnect(): Promise<boolean> {
    return this.deluge.call('web.disconnect')
  }

  /**
   * Download a torrent file to a temp directory
   * @param {string} url the location of the torrent
   * @param {string=} cookie optional cookies to add to the request
   * @returns {Promise.<string>} the location where the torrent file is saved
   */
  downloadTorrentFromUrl(url: string, cookie?: string): Promise<string> {
    return this.deluge.call('web.download_torrent_from_url', url, cookie || '')
  }

  /**
   * Get a list of torrents filtered by filter
   * @param {string[]=} fields
   * @param {FilterTree=} filterTree
   * @returns {Promise.<Object>}
   */
  updateUi(fields: ?string[] = [], filterTree: ?FilterTree): Promise<Object> {
    return this.deluge.call('web.update_ui', fields || [], filterTree || {})
  }

  /**
   * Get an array of available hosts
   * @returns {Promise.<Host[]>} array with hosts
   */
  getHosts(): Promise<Host[]> {
    return this.deluge.call('web.get_hosts')
      .then(hosts => hosts.map(([id, ip, port, status]) => ({ id, ip, port, status })))
  }

  /**
   * Get the status from a host
   * @param {Host.id} hostId id of host to get information from
   * @returns {Promise.<Host>}
   */
  getHostStatus(hostId: string): Promise<Host> {
    return this.deluge.call('web.get_host_status', hostId)
      .then(([id, ip, port, status, version]) => ({ id, ip, port, status, version }))
  }

  /**
   * Get information from a torrent file on the file system
   * @param {string} torrentPath the absolute path to the torrent on the file system
   * @returns {Promise.<TorrentInfo>}
   */
  getTorrentInfo(torrentPath: string): Promise<TorrentInfo> {
    return this.deluge.call('web.get_torrent_info', torrentPath)
  }

  /**
   * Get information about a magnet link
   * @param {string} torrentUri the magnet uri
   * @returns {Promise.<TorrentInfo>}
   */
  getMagnetInfo(torrentUri: string): Promise<TorrentInfo> {
    return this.deluge.call('web.get_magnet_info', torrentUri)
  }

  /**
   * Get an object containing the available and enabled plugins
   * @returns {Promise.<{available_plugins: string[],enabled_plugins: string[] }>}
   */
  getPlugins(): Promise<{ available_plugins: string[], enabled_plugins: string[] }> {
    return this.deluge.call('web.get_plugins')
  }

  /**
   * Receive a dictionary of the torrent with id torrentId
   * The difference between this and {@link Core#getTorrentStatus} is
   * that this one can also give you the torrent label
   * @param {string} torrentId
   * @param {string[]=} keys (To see available keys call this function with an empty array)
   * @returns {Promise.<Torrent>} the object with the specified keys
   */
  getTorrentStatus(torrentId: string, keys?: string[]): Promise<Torrent> {
    return this.deluge.call('web.get_torrent_status', torrentId, keys || [])
  }

  /**
   * Get the web configuration
   * @returns {Promise.<Object>} the web configuration
   */
  getConfig(): Promise<Object> {
    return this.deluge.call('web.get_config')
  }

  /**
   * Get the resource locations for a plugin. Returns null if the plugin is not found
   * @useless
   * @param {string} pluginName
   * @returns {Promise.<?{debug_scripts: string[], scripts: string[]}>}
   */
  getPluginResources(pluginName: string): Promise<?{ debug_scripts: string[], scripts: string[] }> {
    return this.deluge.call('web.get_plugin_resources', pluginName)
  }

  /**
   * Get the pending events for the session
   * @returns {Promise.<?string[]>}
   */
  getEvents(): Promise<?string[]> {
    return this.deluge.call('web.get_events')
  }

  /**
   * Get a file tree of the contents of a torrent
   * @param {string} torrentId
   * @returns {Promise.<Object>}
   */
  getTorrentFiles(torrentId: string): Promise<Object> {
    return this.deluge.call('web.get_torrent_files', torrentId)
  }

  /**
   * Get information on a plugin
   * @param {string} pluginName
   * @returns {Promise.<PluginInfo>}
   */
  getPluginInfo(pluginName: string): Promise<PluginInfo> {
    return this.deluge.call('web.get_plugin_info', pluginName)
  }

  /**
   * Remove a host from the web ui
   * @param {Host.id} hostId the id of the host to remove
   * @returns {Promise.<boolean>} if the removal was successful
   */
  removeHost(hostId: string): Promise<boolean> {
    return this.deluge.call('web.remove_host', hostId)
  }

  /**
   * Add a listene to the queue
   * @param {string} eventName the name of the event to listen for
   * @returns {Promise.<null>}
   */
  registerEventListener(eventName: string): Promise<void> {
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
  addHost(ip: string, port: number, username: string, password: string): Promise<boolean> {
    return this.deluge.call('web.add_host', ip, port, username, password)
      .then(result => result[0])
  }

  /**
   * Start a local daemon
   * @param {number} port
   * @returns {Promise.<bool>}
   */
  startDaemon(port: number): Promise<boolean> {
    return this.deluge.call('web.start_daemon', port)
  }

  /**
   * Stop a running daemon
   * @param {Host.id} hostId
   * @returns {Promise.<bool>}
   */
  stopDaemon(hostId: string): Promise<boolean> {
    return this.deluge.call('web.stop_daemon', hostId)
  }

  /**
   * Upload a plugin to the web ui
   * @param {string} filename name of the plugin file
   * @param {string} path path to the plugin file
   * @returns {Promise.<bool>} true if the upload was success
   */
  uploadPlugin(filename: string, path: string): Promise<boolean> {
    return this.deluge.call('web.upload_plugin', filename, path)
  }

  uploadTorrentFile(file: File): Promise<string[]> {
    const formData = new FormData()
    formData.append('file', file)
    return fetch(
      `${this.deluge.location}/upload`, {
        method: 'POST',
        mode: 'cors',
        headers: new Headers({
          Accept: 'application/json',
        }),
        body: formData,
        cache: 'no-cache',
        credentials: 'include',
      },
    )
      .then(response => response.json())
      .then((json) => {
        console.log(json)
        if (json.success === true) {
          return json.files[0]
        }
        throw new Error('Error uploading files')
      })
  }
}

export default Web
