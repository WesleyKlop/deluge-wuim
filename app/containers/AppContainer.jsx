import React, { Component, PropTypes } from 'react'
import App from '../components/App'

class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    const { children } = this.props
    return (<App>{children}</App>)
  }
}

export default AppContainer
