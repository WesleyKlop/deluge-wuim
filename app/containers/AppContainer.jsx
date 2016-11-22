import React, { Component, PropTypes } from 'react'
import { BrowserRouter } from 'react-router'
import Helmet from 'react-helmet'
import App from '../components/App'
import Deluge from '../api/Deluge'
import { delugeLocation, basename } from '../../settings.json'

class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  static childContextTypes = {
    deluge: PropTypes.instanceOf(Deluge),
    showSnackbar: PropTypes.func,
  }

  constructor() {
    super()

    this.deluge = new Deluge({ delugeLocation })
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSnackbarTimeout = this.handleSnackbarTimeout.bind(this)
    this.showSnackbar = this.showSnackbar.bind(this)

    if (window) window.deluge = this.deluge
  }

  state = {
    searchValue: '',
    snackbarActive: false,
    snackbarText: '',
    onSnackbarTimeout: null,
  }

  getChildContext() {
    return {
      deluge: this.deluge,
      showSnackbar: this.showSnackbar,
    }
  }

  handleSearchChange(e) {
    this.setState({ searchValue: e.currentTarget.value })
  }

  handleSnackbarTimeout() {
    if (typeof this.state.onSnackbarTimeout === 'function') {
      this.state.onSnackbarTimeout()
    }
    this.setState({
      snackbarActive: false,
      snackbarText: '',
      onSnackbarTimeout: null,
    })
  }

  /**
   * Show a snackbar for 2750ms
   * @param {string} message
   * @param {function=} onTimeout
   */
  showSnackbar(message, onTimeout = null) {
    this.setState({
      snackbarActive: true,
      snackbarText: message,
      onSnackbarTimeout: onTimeout,
    })
  }

  render() {
    return (
      <BrowserRouter basename={basename} ref={e => (this.router = e)}>
        <App
          onSearchChange={this.handleSearchChange}
          searchValue={this.state.searchValue}
          snackbarText={this.state.snackbarText}
          snackbarActive={this.state.snackbarActive}
          onSnackbarTimeout={this.handleSnackbarTimeout}
        >
          <Helmet
            titleTemplate="%s - Deluge"
            defaultTitle="Deluge WUIM"
          />
        </App>
      </BrowserRouter>
    )
  }
}

export default AppContainer
