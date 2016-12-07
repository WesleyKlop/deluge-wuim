// @flow
import Deluge from './Deluge'

/**
 * Deluge Auth module, this class provides all auth.* methods of the API
 */
class Auth {
  deluge: Deluge

  /**
   * Auth constructor
   * @param {Deluge} deluge
   */
  constructor(deluge: Deluge) {
    this.deluge = deluge
  }

  /**
   * Logs in on the server, resolves with true or rejects with the error object
   * @param {string} password
   * @returns {Promise.<bool>}
   */
  login(password: string): Promise<boolean> {
    return this.deluge.call('auth.login', password)
  }

  /**
   * Alias for {@link Auth#deleteSession}
   * @see Auth#deleteSession
   * @returns {Promise.<bool>}
   */
  logout(): Promise<boolean> {
    return this.deleteSession()
  }

  /**
   *  Checks the sign in status on the server, resolves with true or false
   * @returns {Promise.<bool>} true if the user is logged in or false
   */
  checkSession(): Promise<boolean> {
    return this.deluge.call('auth.check_session')
  }

  /**
   * Sign out the current user
   * @returns {Promise.<bool>} true if the sign out was succesful
   */
  deleteSession(): Promise<boolean> {
    return this.deluge.call('auth.delete_session')
  }

  /**
   * Change the password of the current user
   * @param {string} currPass the current password
   * @param {string} newPass the new password
   * @returns {Promise.<bool>}
   */
  changePassword(currPass: string, newPass: string): Promise<boolean> {
    return this.deluge.call('auth.change_password', currPass, newPass)
  }
}

export default Auth
