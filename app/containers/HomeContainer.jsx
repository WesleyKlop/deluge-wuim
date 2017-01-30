// @flow
import React, { Component, PropTypes } from 'react'
import Deluge from '../lib/Deluge/Deluge'
import Home from '../components/Home'
import { RequireAuth } from './'

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

  props: HomeContainerProps

  handleFabClick = (type: string) => this.context.router.transitionTo({
    pathname: '/add',
    state: { type },
  })

  handleAddUrlClick = () => this.handleFabClick('url')
  handleAddFileClick = () => this.handleFabClick('file')

  render() {
    return (
      <RequireAuth>
        <Home
          deluge={this.context.deluge}
          filter={this.state.filter}
          onAddUrlClick={this.handleAddUrlClick}
          onAddFileClick={this.handleAddFileClick}
        />
      </RequireAuth>
    )
  }
}

export default HomeContainer
