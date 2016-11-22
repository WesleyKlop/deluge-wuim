import React, { Component, PropTypes } from 'react'
import Deluge from '../api/Deluge'
import Home from '../components/Home'
import TorrentContainer from './TorrentContainer'

class HomeContainer extends Component {
  static propTypes = {}

  static contextTypes = {
    deluge: PropTypes.instanceOf(Deluge),
    router: PropTypes.object,
  }

  state = {
    filter: {},
  }

  async componentWillMount() {
    const { deluge, router } = this.context
    console.log(router)
    if (await deluge.auth.checkSession() === false) {
      router.transitionTo('/login')
    } else if (await deluge.web.connected() === false) {
      router.transitionTo('/connection')
    }
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
