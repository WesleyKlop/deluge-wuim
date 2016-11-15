import React, { Component, PropTypes } from 'react'
import App from '../components/App'
import Deluge from '../api/Deluge'

class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  constructor() {
    super()

    this.deluge = new Deluge({ delugeLocation: 'https://app.wesleyklop.nl/deluge/' })
    if (window) window.deluge = this.deluge
  }

  render() {
    const { children } = this.props
    return (<App>{children}</App>)
  }
}

export default AppContainer
