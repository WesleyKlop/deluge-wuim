// @flow
import Deluge from './Deluge'

class Daemon {
  deluge: Deluge

  /**
   * Daemon class constructor
   * @param {Deluge} deluge
   */
  constructor(deluge: Deluge) {
    this.deluge = deluge
  }

  /**
   * Fetch an array of available methods
   * @returns {Promise.<Array<string>>} array with all methods except for the web.* methods
   */
  getMethodList(): Promise<string[]> {
    return this.deluge.call('daemon.get_method_list')
  }

  /**
   * Get the Deluge version on the server
   * @returns {Promise.<string>} the deluge version
   */
  info(): Promise<string> {
    return this.deluge.call('daemon.info')
  }

  /**
   * Stops the Deluge daemon
   */
  shutdown(): void {
    this.deluge.call('daemon.shutdown')
  }
}

export default Daemon
