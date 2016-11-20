class WebUi {
  static CONFIG_KEYS = [
    'ssl',
    'enabled',
    'port',
  ]

  /**
   * WebUi constructor
   * @param {Deluge} deluge
   */
  constructor(deluge) {
    this.deluge = deluge
  }

  /**
   * Get the webui config or just one value
   * @param {string=} key
   * @returns {Promise<*>} the specified config value or the object with all config options
   */
  async getConfig(key) {
    const config = await this.deluge.call('webui.get_config')

    if (key === undefined) {
      return config
    }

    if (key in config) {
      return config[key]
    }

    return Promise.reject(`config does not contain key '${key}'`)
  }

  /**
   * Edit the webui config
   * @param {bool=} config.ssl
   * @param {bool=} config.enabled
   * @param {int=} config.port
   */
  async setConfig(config) {
    if (config.ssl && typeof config.ssl !== 'boolean') {
      throw new TypeError(`Expecting parameter ssl to be Boolean but got ${typeof config.ssl}`)
    }
    if (config.enabled && typeof config.enabled !== 'boolean') {
      throw new TypeError(`Expecting parameter enabled to be Boolean but got ${typeof config.enabled}`)
    }
    if (config.port && typeof config.port !== 'number') {
      throw new TypeError(`Expecting parameter port to be Number but got ${typeof config.port}`)
    }

    // Throw error if we got any keys we do not want
    if (Object.keys(config).some(key => !WebUi.CONFIG_KEYS.includes(key))) {
      throw new Error(`Unexpected key in config object, allowed keys are: "${WebUi.CONFIG_KEYS.join('", "')}"`)
    }

    return this.deluge.call('webui.set_config', config)
  }

  /**
   * I honestly have no idea what this does ¯\_(ツ)_/¯
   * @returns {Promise<bool>}
   */
  gotDelugeWeb() {
    return this.deluge.call('webui.got_deluge_web')
  }

  /**
   * Start the web ui
   * @returns {*}
   */
  start() {
    return this.deluge.call('webui.start')
  }

  /**
   * Stop the web ui
   * @returns {*}
   */
  stop() {
    return this.deluge.call('webui.stop')
  }
}

export default WebUi
