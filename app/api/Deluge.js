import { Auth, Daemon, WebUi, Core } from './'

/**
 * Deluge class with all accesible methods from the JSON api
 */
class Deluge {
  location = ''

  /**
   * Deluge class constructor
   * @param {string=} delugeLocation
   * @param {Auth=} auth
   * @param {Core=} core
   * @param {Daemon=} daemon
   * @param {WebUi=} webui
   */
  constructor({ delugeLocation = '', auth, core, daemon, webui }) {
    if (delugeLocation.length > 1) {
      this.location = delugeLocation.endsWith('/') ? delugeLocation.slice(0, -1) : delugeLocation
    }
    this.auth = auth || new Auth(this)
    this.core = core || new Core(this)
    this.daemon = daemon || new Daemon(this)
    this.webui = webui || new WebUi(this)
  }

  requestCounter = 0
  log = {
    response: false,
    result: true,
  }

  /**
   * Increment the request counter and return it
   * @returns {number} the incremented request id
   */
  getRequestCount() {
    this.requestCounter += 1
    return this.requestCounter
  }

  /**
   * Execute the given method property with optional params on
   * the server and return a promise with the Response
   * @param {string} method the method to call
   * @param {Array=} params the optional parameters to send
   * @returns {Promise.<*>}
   */
  call(method, params = []) {
    return fetch(
      `${this.location}/json`, {
        method: 'POST',
        mode: 'cors',
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        body: JSON.stringify({
          id: this.getRequestCount(),
          method,
          params,
        }),
        cache: 'no-cache',
        credentials: 'include',
      },
    ).then((response) => {
      if (this.log.response === true) {
        // eslint-disable-next-line no-console
        console.info(response)
      }
      return response.json()
    }).then(({ result, error }) => {
      if (error) {
        return Promise.reject(error)
      }
      if (this.log.result === true) {
        // eslint-disable-next-line no-console
        console.info(result)
      }
      return Promise.resolve(result)
    })
  }

  /**
   * Find a command in the list of commands that the server supports
   * @param {string=} command
   * @returns {Promise.<Array<string>>}
   */
  findCommand(command = '') {
    const didLogResult = this.log.result
    this.log.result = false
    return this.call('system.listMethods')
      .then(response => response.filter(row => row.includes(command)))
      .then((matches) => {
        console.info(matches) // eslint-disable-line no-console
        this.log.result = didLogResult
        return matches
      })
  }
}

export default Deluge
