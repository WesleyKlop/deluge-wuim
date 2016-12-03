// @flow
import React, { Component, PropTypes } from 'react'
import Deluge from '../api/Deluge'
import Home from '../components/Home'
import { TorrentContainer } from './'

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

export default HomeContainer
