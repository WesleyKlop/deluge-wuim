// @flow
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import App from '../components/App'
import Deluge from '../api/Deluge'
import { changeSearchValue } from '../actions'

type AppContainerProps = {
  children?: any,
  searchbarValue: string,
  onSearchChange: () => void
}

class AppContainer extends Component {

  static childContextTypes = {
    showSnackbar: PropTypes.func,
  }

  constructor() {
    super()

    this.handleSnackbarTimeout = this.handleSnackbarTimeout.bind(this)
    this.showSnackbar = this.showSnackbar.bind(this)
    this.toggleDrawer = this.toggleDrawer.bind(this)
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

  componentDidMount() {
    this.layout = (document.querySelector('.mdl-layout'): any).MaterialLayout
  }

  deluge: Deluge
  handleSearchChange: () => void
  handleSnackbarTimeout: () => void
  showSnackbar: () => void
  toggleDrawer: () => void
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

  toggleDrawer() {
    if (typeof this.layout !== 'undefined') {
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
    const { children } = this.props
    return (
      <App
        onDrawerLinkClick={this.toggleDrawer}
        onSearchChange={this.props.onSearchChange}
        searchValue={this.props.searchbarValue}
        snackbarText={this.state.snackbarText}
        snackbarActive={this.state.snackbarActive}
        onSnackbarTimeout={this.handleSnackbarTimeout}
        helmet={children}
      />
    )
  }
}

const mapStateToProps = state => ({
  searchbarValue: state.searchbarValue,
})

const mapDispatchToProps = dispatch => ({
  onSearchChange: e => dispatch(changeSearchValue(e.currentTarget.value)),
})

// $FlowIgnore
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppContainer)
