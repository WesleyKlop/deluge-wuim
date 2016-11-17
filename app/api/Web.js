class Web {
  /**
   * Web constructor
   * @param {Deluge} deluge
   */
  constructor(deluge) {
    this.deluge = deluge
  }

  /**
   * Returns true if the web ui is connected to the daemon
   */
  connected() {
    return this.deluge.call('web.connected')
  }

  /**
   * @typedef {Object} Filter
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
    return this.deluge.call('web.update_ui', [fields, filter || {}])
  }

  /**
   * Get an array of available hosts
   * @returns {Promise.<Array>} array with hosts
   */
  getHosts() {
    return this.deluge.call('web.get_hosts')
  }

  /**
   * Get the status from a host
   * @param {string[]} hostIds
   * @returns {*}
   */
  getHostStatus(...hostIds) {
    return this.deluge.call('web.get_host_status', hostIds)
  }
}

export default Web
