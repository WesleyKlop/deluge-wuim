import React, { Component, PropTypes } from 'react'
import { List } from 'react-mdl'
import Helmet from 'react-helmet'
import Deluge from '../api/Deluge'
import TorrentItem from '../components/TorrentItem'

class TorrentContainer extends Component {
  static propTypes = {
    deluge: PropTypes.instanceOf(Deluge).isRequired,
    filter: PropTypes.shape({
      state: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string,
      ]),
      label: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string,
      ]),
      tracker_host: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string,
      ]),
    }),
  }

  state = {
    torrents: [],
    showSessionSpeed: false,
    title: '',
  }


  async componentWillMount() {
    const { show_session_speed } = await this.props.deluge.web.getConfig()
    this.setState({ showSessionSpeed: show_session_speed })
  }

  componentDidMount() {
    this.updateTorrents()
    this.updateInterval = setInterval(() => this.updateTorrents(), 3000)
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval)
    this.setState({ torrents: [] })
  }

  async updateTorrents() {
    const {
      torrents,
      stats: {
        download_rate: downloadRate,
        upload_rate: uploadRate,
      },
    } = await this.props.deluge.web.updateUi(['hash', 'name', 'eta', 'label', 'ratio', 'state', 'download_rate', 'progress', 'total_done', 'total_wanted', 'upload_rate'], this.props.filter)
    const nextState = { torrents: Object.values(torrents) }

    if (this.state.showSessionSpeed === true) {
      nextState.title = `${(downloadRate / 1024).toFixed(1)}K / ${(uploadRate / 1024).toFixed(1)}K`
    }

    this.setState(nextState)
  }

  renderTorrents() {
    return this.state.torrents.map(row => (
      <TorrentItem
        key={row.hash}
        hash={row.hash}
        name={row.name}
        eta={row.eta}
        label={row.label}
        ratio={row.ratio}
        state={row.state}
        downloadRate={row.download_rate}
        progress={row.progress}
        downloaded={row.total_done}
        size={row.total_wanted}
        complete={row.total_done === row.total_wanted}
      />
    ))
  }

  render() {
    return (
      <div>
        <Helmet title={this.state.title} />
        <List>{this.renderTorrents()}</List>
      </div>
    )
  }
}

export default TorrentContainer
