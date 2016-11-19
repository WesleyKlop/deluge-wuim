import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import Login from '../components/Login'
import PageContent from '../components/PageContent'
import Deluge from '../api/Deluge'
import delugeLogo from '../assets/deluge.svg'

/**
 * LoginContainer Component
 * @property {Deluge} context.deluge
 */
class LoginContainer extends Component {
  static contextTypes = {
    deluge: PropTypes.instanceOf(Deluge),
  }

  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  state = {
    error: '',
  }

  async handleSubmit(e) {
    e.preventDefault()
    const password = this.passwordRef.value

    if (this.state.error !== '') {
      this.setState({ error: '' })
    }
    await this.tryLogin(password)
  }

  async tryLogin(password) {
    const { deluge } = this.context
    if (await deluge.auth.login(password)) {
      if ('credentials' in navigator) {
        await this.saveCredentials(password)
      }
      // Go to home if we're connected or else route to the connection manager
      if (await deluge.web.connected() === true) {
        browserHistory.push('/')
      } else {
        browserHistory.push('/connection')
      }
    } else {
      this.setState({ error: 'Invalid password' })
    }
  }

  async saveCredentials(password) {
    const credential = new PasswordCredential({
      id: 'deluge',
      password,
      name: 'Deluge',
      iconURL: `${location.origin}/${delugeLogo}`,
    })

    this.setState({ error: '' })
    return await navigator.credentials.store(credential)
  }

  render() {
    return (
      <PageContent>
        <Login
          onSubmit={this.handleSubmit}
          inputRefCb={e => (this.passwordRef = e && e.inputRef)}
          error={this.state.error}
        />
      </PageContent>
    )
  }
}

export default LoginContainer
