// @flow
import React, { Component, PropTypes } from 'react'
import { Textfield } from 'react-mdl'
import { connect } from 'react-redux'
import Login from '../components/Login'
import PageContent from '../components/PageContent'
import Deluge from '../lib/Deluge/Deluge'
import delugeLogo from '../assets/deluge.png'
import { authenticate } from '../actions/session'

/**
 * LoginContainer Component
 * @property {Deluge} context.deluge
 */
class LoginContainer extends Component {
  static contextTypes = {
    deluge: PropTypes.instanceOf(Deluge),
    router: PropTypes.object,
  }

  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  state = {
    error: '',
  }

  state: {
    error: ?string
  }
  passwordRef: HTMLInputElement
  handleSubmit: () => void

  async handleSubmit(e: Event): Promise<void> {
    e.preventDefault()
    const password = this.passwordRef.value

    if (this.state.error !== '') {
      this.setState({ error: '' })
    }
    await this.tryLogin(password)
  }

  async tryLogin(password: string) {
    const { deluge, router } = this.context
    if (await this.props.authenticate(password)) {
      if ('credentials' in navigator && location.protocol.startsWith('https')) {
        await this.saveCredentials(password)
      }
      // Go to home if we're connected or else route to the connection manager
      if (await deluge.web.connected() === true) {
        router.transitionTo('/')
      } else {
        router.transitionTo('/connection')
      }
    } else {
      this.setState({ error: 'Invalid password' })
    }
  }

  async saveCredentials(password: string) {
    // $FlowIgnore: Flow does not have declaration for Credentials API
    const credential = new PasswordCredential({
      id: 'deluge',
      password,
      name: 'Deluge WUIM',
      iconURL: `${location.origin}/${delugeLogo}`,
    })

    this.setState({ error: '' })
    // $FlowIgnore: Flow does not have declarations for Credentials API
    return navigator.credentials.store(credential)
  }

  render() {
    return (
      <PageContent>
        <Login
          onSubmit={this.handleSubmit}
          inputRefCb={(e: Textfield) => (this.passwordRef = e && e.inputRef)}
          error={this.state.error}
        />
      </PageContent>
    )
  }
}

const mapStateToProps = state => ({
  authenticated: state.session.authenticated,
})

const mapDispatchToProps = dispatch => ({
  authenticate: password => dispatch(authenticate(password)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginContainer)
