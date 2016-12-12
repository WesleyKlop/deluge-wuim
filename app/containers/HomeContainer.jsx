// @flow
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Deluge from '../api/Deluge'
import Home from '../components/Home'
import { TorrentContainer } from './'
import { setAuthenticated } from '../actions/session'

type HomeContainerProps = {
  setAuthenticated: (val: boolean) => void,
}

class HomeContainer extends Component {

  static contextTypes = {
    deluge: PropTypes.instanceOf(Deluge),
    router: PropTypes.object,
  }

  state = {
    filter: {},
  }

  state: {
    filter: {
      state: string | string[],
      label: string | string[],
      tracker_host: string | string[],
    },
  }

  componentWillMount(): void {
    const { deluge, router } = this.context
    deluge.auth.checkSession()
      .then((resp) => {
        this.props.setAuthenticated(resp)
        if (!resp) {
          // Route to login
          router.transitionTo('/login')
          // Resolve with true so we won't go to the connection manager before being able to login
          return Promise.resolve(true)
        }
        return deluge.web.connected()
      })
      .then((resp) => {
        if (!resp) {
          // Route to connection manager
          router.transitionTo('/connection')
        }
      })
  }

  props: HomeContainerProps

  render() {
    return (
      <Home>
        <TorrentContainer
          deluge={this.context.deluge}
          filter={this.state.filter}
        />
      </Home>
    )
  }
}

const mapStateToProps = state => ({
  authenticated: state.session.authenticated,
})

const mapDispatchToProps = dispatch => ({
  setAuthenticated: val => dispatch(setAuthenticated(val)),
})

// $FlowIgnore
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeContainer)
