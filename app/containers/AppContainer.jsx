// @flow
import React, { Component, PropTypes } from 'react'
import App from '../components/App'
import Deluge from '../api/Deluge'

type AppContainerProps = {
  children?: any
}

class AppContainer extends Component {

  static childContextTypes = {
    showSnackbar: PropTypes.func,
  }

  constructor() {
    super()

    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSnackbarTimeout = this.handleSnackbarTimeout.bind(this)
    this.showSnackbar = this.showSnackbar.bind(this)
  }

  state = {
    searchValue: '',
    snackbarActive: false,
    snackbarText: '',
    onSnackbarTimeout: null,
  }

  state: {
    searchValue: string,
    snackbarActive: boolean,
    snackbarText: string,
    onSnackbarTimeout?: () => void,
  }

  getChildContext() {
    return {
      showSnackbar: this.showSnackbar,
    }
  }

  deluge: Deluge
  handleSearchChange: () => void
  handleSnackbarTimeout: () => void
  showSnackbar: () => void
  props: AppContainerProps

  handleSearchChange(e: { currentTarget: HTMLInputElement }) {
    this.setState({ searchValue: e.currentTarget.value })
  }

  handleSnackbarTimeout() {
    if (typeof this.state.onSnackbarTimeout === 'function') {
      this.state.onSnackbarTimeout()
    }
    this.setState({
      snackbarActive: false,
      snackbarText: '',
      onSnackbarTimeout: undefined,
    })
  }

  /**
   * Show a snackbar for 2750ms
   * @param {string} message
   * @param {function=} onTimeout
   */
  showSnackbar(message: string, onTimeout?: () => void) {
    this.setState({
      snackbarActive: true,
      snackbarText: message,
      onSnackbarTimeout: onTimeout,
    })
  }

  render() {
    const { children } = this.props
    return (
      <App
        onSearchChange={this.handleSearchChange}
        searchValue={this.state.searchValue}
        snackbarText={this.state.snackbarText}
        snackbarActive={this.state.snackbarActive}
        onSnackbarTimeout={this.handleSnackbarTimeout}
      >{children}</App>
    )
  }
}

export default AppContainer
