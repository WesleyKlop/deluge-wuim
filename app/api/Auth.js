/**
 * Deluge Auth module, this class provides all auth.* methods of the API
 */
class Auth {
  /**
   * Auth constructor
   * @param {Deluge} deluge
   */
  constructor(deluge) {
    this.deluge = deluge
  }

  /**
   * Logs in on the server, resolves with true or rejects with the error object
   * @param {string} password
   * @returns {Promise.<bool>}
   */
  login(password) {
    return this.deluge.call('auth.login', [password])
  }

  /**
   *  Checks the sign in status on the server, resolves with true or false
   * @returns {Promise.<bool>} true if the user is logged in or false
   */
  checkSession() {
    return this.deluge.call('auth.check_session')
  }

  /**
   * Sign out the current user
   * @returns {Promise.<bool>} if the sign out was succesful
   */
  deleteSession() {
    return this.deluge.call('auth.delete_session')
  }

  /**
   * Change the password of the current user
   * @param {string} currPass the current password
   * @param {string} newPass the new password
   * @returns {Promise.<bool>}
   */
  changePassword(currPass, newPass) {
    return this.deluge.call('auth.change_password', [currPass, newPass])
  }
}

export default Auth
