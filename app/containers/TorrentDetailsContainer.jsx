// @flow
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TorrentDetails from '../components/TorrentDetails'
import { fetchTorrentDetails, receiveTorrentDetails } from '../actions/session'
import Loading from '../components/Loading'
import type { Torrent } from '../lib/Deluge/types'

type TorrentDetailsProps = {
  location: {
    query: {
      id: string
    }
  },
  fetchTorrentDetails: (torrentId: string) => void,
  selectedTorrent: Torrent,
  clearSelectedTorrent: () => void,
}

type TorrentDetailsState = {
  activeTab: number,
}

class TorrentDetailsContainer extends Component {

  static contextTypes = {
    router: PropTypes.object,
  }

  state: TorrentDetailsState = {
    activeTab: 0,
  }

  componentWillMount(): void {
    if (!this.hasTorrentId()) {
      console.warn('Missing torrent Id')
      this.context.router.transitionTo('/')
      return
    }

    this.props.fetchTorrentDetails(this.props.location.query.id)
  }

  componentDidMount(): void {
    const { fetchTorrentDetails: updateTorrentStatus, location } = this.props
    if (this.hasTorrentId()) {
      this.refreshInterval = setInterval(() => updateTorrentStatus(location.query.id), 3000)
    }
  }

  componentWillUnmount(): void {
    this.props.clearSelectedTorrent()
    clearInterval(this.refreshInterval)
  }

  props: TorrentDetailsProps
  refreshInterval: number = -1

  hasTorrentId(): boolean {
    return this.props.location.query !== null && typeof this.props.location.query.id === 'string'
  }

  handleTabChange = (activeTab): void => this.setState({ activeTab })

  isLoading(): boolean {
    return this.hasTorrentId() && this.props.selectedTorrent === null
  }

  render() {
    if (this.isLoading()) {
      return (
        <Loading />
      )
    }

    const { selectedTorrent: torrent } = this.props

    if (typeof torrent.hash === 'undefined') {
      return <h3>Torrent not found</h3>
    }

    return (
      <TorrentDetails
        {...torrent}
        activeTab={this.state.activeTab}
        onTabChange={this.handleTabChange}
      />
    )
  }
}

const mapStateToProps = state => ({
  selectedTorrent: state.session.selectedTorrent,
})

const mapDispatchToProps = dispatch => ({
  fetchTorrentDetails: torrentId => dispatch(fetchTorrentDetails(torrentId)),
  clearSelectedTorrent: () => dispatch(receiveTorrentDetails(null)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TorrentDetailsContainer)
