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

  componentDidMount() {
    this.deluge.auth.checkSession()
      .then((resp) => {
        if (resp === false) {
          browserHistory.replace('/login')
        }
      })
  }

  render() {
    const { children } = this.props
    return (<App>{children}</App>)
  }
}

export default AppContainer
