export default class Deluge {
  requestCounter = 0

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
      'https://app.wesleyklop.nl/deluge/json', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          id: this.getRequestCount(),
          method,
          params,
        }),
        cache: 'no-cache',
        credentials: 'include',
      },
    ).then(response => response.json())
  }

  /**
   * Calls a method but also logs the result in the console
   * @see Deluge.call
   * @param {string} method the method to call
   * @param {Array=} params the parameters
   * @returns {Promise.<*>}
   */
  logCall(method, params = []) {
    return this.call(method, params)
      .then((response) => {
        console.info(`${method}:`, response) // eslint-disable-line no-console
        return response
      })
  }

  /**
   * Find a command in the list of commands that the server supports
   * @param {string=} command
   * @returns {Promise.<Array<string>>}
   */
  findCommand(command) {
    return this.call('system.listMethods')
      .then(response => response.result.filter(row => row.includes(command)))
      .then(console.info.bind(console)) // eslint-disable-line no-console
  }

  /**
   * Logs in on the server, resolves with true or rejects with the error object
   * @param {string} password
   * @returns {Promise.<*>}
   */
  login(password) {
    return this.logCall('auth.login', [password])
      .then(({ result, error }) => {
        if (result === true) {
          return Promise.resolve(true)
        }
        return Promise.reject(error)
      })
  }
}
