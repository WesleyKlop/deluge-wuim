class Web {
  /**
   * Web constructor
   * @param {Deluge} deluge
   * @constructor
   * @returns {Web}
   */
  constructor(deluge) {
    this.deluge = deluge
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
   * Remove a host from the web ui
   * @param {Host.id} hostId the id of the host to remove
   * @returns {Promise.<boolean>} if the removal was successful
   */
  removeHost(hostId) {
    return this.deluge.call('web.remove_host', hostId)
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
}

export default Web
