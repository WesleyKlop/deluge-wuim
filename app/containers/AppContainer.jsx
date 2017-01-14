// @flow
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import App from '../components/App'
import Deluge from '../lib/Deluge/Deluge'
import { changeSearchValue } from '../actions'
import { setAuthenticated } from '../actions/session'

type AppContainerProps = {
  children: Helmet,
  searchbarValue: string,
  onSearchChange: () => void,
  authenticated: boolean,
  setAuthenticated: () => void,
  deluge: Deluge,
}

class AppContainer extends Component {

  static contextTypes = {
    router: PropTypes.object,
  }

  static childContextTypes = {
    showSnackbar: PropTypes.func,
    setDrawerButton: PropTypes.func,
  }

  constructor() {
    super()

    this.signOut = this.signOut.bind(this)
    this.handleSnackbarTimeout = this.handleSnackbarTimeout.bind(this)
    this.showSnackbar = this.showSnackbar.bind(this)
    this.toggleDrawer = this.toggleDrawer.bind(this)
  }

  state = {
    snackbarActive: false,
    snackbarText: '',
    onSnackbarTimeout: null,
    drawerButton: 'menu',
  }

  state: {
    snackbarActive: boolean,
    snackbarText: string,
    onSnackbarTimeout?: () => void,
    drawerButton: string,
  }

  getChildContext() {
    return {
      showSnackbar: this.showSnackbar,
      setDrawerButton: this.setDrawerButton,
    }
  }

  componentDidMount(): void {
    this.layout = (document.querySelector('.mdl-layout'): any).MaterialLayout
  }

  setDrawerButton = drawerButton => this.setState({ drawerButton })

  handleSnackbarTimeout: () => void
  showSnackbar: () => void
  toggleDrawer: () => void
  signOut: () => void
  layout: Object
  props: AppContainerProps

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

  handleDrawerButtonClick = (e?: Event): void => {
    if (e !== undefined) {
      e.stopPropagation()
      e.preventDefault()
    }

    switch (this.state.drawerButton) {
      case 'menu':
        return
      case 'arrow_back':
        // Drawer toggles regardless of stopPropagation/preventDefault so toggle it again to
        // close it again
        this.toggleDrawer()
        history.back()
        break
      default:
        console.warn('Unknown drawerButton', this.state.drawerButton)
    }
  }

  signOut(): void {
    this.props.deluge.auth.logout()
      .then(() => this.props.setAuthenticated())
    this.toggleDrawer()
  }

  toggleDrawer(): void {
    // eslint-disable-next-line no-underscore-dangle
    if (typeof this.layout !== 'undefined' && this.layout.element_.classList.contains('is-small-screen')) {
      this.layout.toggleDrawer()
    }
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
    const { children, authenticated } = this.props
    return (
      <App
        authenticated={authenticated}
        onDrawerLinkClick={this.toggleDrawer}
        onSearchChange={this.props.onSearchChange}
        searchValue={this.props.searchbarValue}
        snackbarText={this.state.snackbarText}
        snackbarActive={this.state.snackbarActive}
        onSnackbarTimeout={this.handleSnackbarTimeout}
        helmet={children}
        signOut={this.signOut}
        onDrawerButtonClick={this.handleDrawerButtonClick}
        drawerButton={this.state.drawerButton}
      />
    )
  }
}

const mapStateToProps = state => ({
  searchbarValue: state.searchbarValue,
  authenticated: state.session.authenticated,
})

const mapDispatchToProps = dispatch => ({
  onSearchChange: e => dispatch(changeSearchValue(e.currentTarget.value)),
  setAuthenticated: () => dispatch(setAuthenticated(false)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppContainer)
