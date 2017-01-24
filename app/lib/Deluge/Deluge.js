// @flow
import { Auth, Daemon, WebUi, Core, Web } from './'

type Log = {
  response: boolean,
  result: boolean,
  exclude: string[]
}

type ConstructorArgs = {
  delugeLocation?: string,
  auth?: Auth,
  core?: Core,
  daemon?: Daemon,
  webui?: WebUi,
  web?: Web,
}

/**
 * Deluge class with all accesible methods from the JSON api
 */
class Deluge {
  location: string = ''
  auth: Auth
  core: Core
  webui: WebUi
  web: Web
  daemon: Daemon

  /**
   * Deluge class constructor
   * @param {string=} delugeLocation
   * @param {Auth=} auth
   * @param {Core=} core
   * @param {Daemon=} daemon
   * @param {WebUi=} webui
   * @param {Web=} web
   */
  constructor({ delugeLocation = '', auth, core, daemon, webui, web }: ConstructorArgs) {
    if (delugeLocation.length > 1) {
      this.location = delugeLocation.endsWith('/') ? delugeLocation.slice(0, -1) : delugeLocation
    }

    this.auth = auth || new Auth(this)
    this.core = core || new Core(this)
    this.daemon = daemon || new Daemon(this)
    this.webui = webui || new WebUi(this)
    this.web = web || new Web(this)
    if (this.log.exclude.length > 0) {
      console.info(`[Deluge] Excluding calls to: ${this.log.exclude.join(', ')}`)
    }
  }

  requestCounter: number = 0
  log: Log = {
    response: false,
    result: true,
    exclude: [
      'web.update_ui',
      'web.get_torrent_status',
      'web.get_config',
      'auth.check_session',
    ],
  }

  /**
   * Increment the request counter and return it
   * @returns {number} the incremented request id
   */
  getRequestCount(): number {
    this.requestCounter += 1
    return this.requestCounter
  }

  /**
   * Execute the given method property with optional params on
   * the server and return a promise with the Response
   * @param {string} method the method to call
   * @param {...*} params the optional parameters to send
   * @returns {Promise.<*>}
   */
  call(method: string, ...params: any[]): Promise<any> {
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
      if (this.log.response === true && !this.log.exclude.includes(method)) {
        // eslint-disable-next-line no-console
        console.info(`[${method}]`, response)
      }
      return response.json()
    }).then(({ result, error }) => {
      if (error) {
        return Promise.reject(error)
      }
      if (this.log.result === true && !this.log.exclude.includes(method)) {
        // eslint-disable-next-line no-console
        console.info(`[${method}]`, result)
      }
      return Promise.resolve(result)
    })
  }

  /**
   * Find a command in the list of commands that the server supports
   * @param {string=} command
   * @returns {Promise.<Array<string>>}
   */
  findCommand(command: string = ''): Promise<string[]> {
    const didLogResult = this.log.result
    this.log.result = false
    return this.call('system.listMethods')
      .then(response => response.filter(row => row.includes(command)))
      .then(matches => matches.sort((a, b) => a.localeCompare(b)))
      .then((matches) => {
        console.info(matches) // eslint-disable-line no-console
        this.log.result = didLogResult
        return matches
      })
  }
}

export default Deluge
