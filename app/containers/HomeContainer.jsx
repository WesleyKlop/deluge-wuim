import React, { Component, PropTypes } from 'react'
import Deluge from '../api/Deluge'
import Home from '../components/Home'
import TorrentContainer from './TorrentContainer'

class HomeContainer extends Component {
  static propTypes = {}

  static contextTypes = {
    deluge: PropTypes.instanceOf(Deluge),
  }

  state = {
    filter: {},
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
