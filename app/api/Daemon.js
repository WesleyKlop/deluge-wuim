class Daemon {
  /**
   * Daemon class constructor
   * @param {Deluge} deluge
   */
  constructor(deluge) {
    this.deluge = deluge
  }

  /**
   * Fetch an array of available methods
   * @returns {Promise.<Array<string>>} array with all methods except for the web.* methods
   */
  getMethodList() {
    return this.deluge.call('daemon.get_method_list')
  }

  /**
   * Get the Deluge version on the server
   * @returns {Promise.<string>} the deluge version
   */
  info() {
    return this.deluge.call('daemon.info')
  }

  /**
   * Stops the Deluge daemon
   */
  shutdown() {
    this.deluge.call('daemon.shutdown')
  }
}

export default Daemon
