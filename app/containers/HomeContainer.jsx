// @flow
import React, { Component, PropTypes } from 'react'
import Deluge from '../lib/Deluge/Deluge'
import { TorrentContainer, RequireAuth } from './'

type HomeContainerProps = {
  setAuthenticated: (val: boolean) => void,
}

class HomeContainer extends Component {

  static contextTypes = {
    deluge: PropTypes.instanceOf(Deluge),
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

  props: HomeContainerProps

  render() {
    return (
      <RequireAuth>
        <TorrentContainer
          deluge={this.context.deluge}
          filter={this.state.filter}
        />
      </RequireAuth>
    )
  }
}

export default HomeContainer
