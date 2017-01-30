// @flow
import React, { Component, PropTypes } from 'react'
import { List } from 'react-mdl'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import TorrentItem from '../components/TorrentItem'
import Deluge from '../lib/Deluge'
import { fetchTorrents, setShowSessionSpeed } from '../actions'
import type { Torrent } from '../lib/Deluge/types'

type TorrentContainerProps = {
  deluge: Deluge,
  torrents: Torrent[],
  fetchTorrents: () => void,
  session: {
    upload: number,
    download: number,
    showSessionSpeed: boolean,
  },
  showSessionSpeed: () => void,
  nameFilter: string,
}

class TorrentContainer extends Component {

  static contextTypes = {
    router: PropTypes.object,
  }

  componentWillMount() {
    this.props.deluge.web
      .getConfig()
      .then(config => this.props.showSessionSpeed(config.show_session_speed))
  }

  componentDidMount() {
    this.props.fetchTorrents()
    this.updateInterval = setInterval(() => this.props.fetchTorrents(), 3000)
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval)
  }

  props: TorrentContainerProps
  updateInterval: number

  handleTorrentClick = (hash) => {
    const { router } = this.context

    router.push({
      pathname: '/torrent',
      query: {
        id: hash,
      },
    })
  }

  renderTorrents() {
    return this.props.torrents
      .filter(row => row.name.toLowerCase().includes(this.props.nameFilter.toLowerCase()))
      // .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
      .map(row => (
        <TorrentItem
          key={row.hash}
          hash={row.hash}
          name={row.name}
          eta={row.eta}
          label={row.label}
          ratio={row.ratio}
          state={row.state}
          downloadRate={row.download_payload_rate}
          progress={row.progress}
          downloaded={row.total_done}
          size={row.total_wanted}
          complete={row.total_done === row.total_wanted}
          onTorrentClick={this.handleTorrentClick}
        />
      ))
  }

  renderTitle() {
    if (!this.props.session.showSessionSpeed) {
      return ''
    }

    const { download, upload } = this.props.session
    return `${(download / 1024).toFixed(1)}K / ${(upload / 1024).toFixed(1)}K`
  }

  render() {
    return (
      <div>
        <Helmet title={this.renderTitle()} />
        <List>{this.renderTorrents()}</List>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  torrents: state.torrents,
  session: state.session,
  nameFilter: state.searchbarValue,
})

const mapDispatchToProps = dispatch => ({
  fetchTorrents: () => dispatch(fetchTorrents()),
  showSessionSpeed: val => dispatch(setShowSessionSpeed(val)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TorrentContainer)
