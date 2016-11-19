import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import App from '../components/App'
import Deluge from '../api/Deluge'

class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  static childContextTypes = {
    deluge: PropTypes.instanceOf(Deluge),
  }

  constructor() {
    super()

    this.deluge = new Deluge({ delugeLocation: 'https://app.wesleyklop.nl/deluge/' })
    if (window) window.deluge = this.deluge
  }

  getChildContext() {
    return {
      deluge: this.deluge,
    }
  }

  async componentWillMount() {
    if (await this.deluge.auth.checkSession() === false) {
      browserHistory.push('/login')
    } else if (await this.deluge.web.connected() === false) {
      browserHistory.push('/connection')
    }
  }

  render() {
    const { children } = this.props
    return (<App>{children}</App>)
  }
}

export default AppContainer
