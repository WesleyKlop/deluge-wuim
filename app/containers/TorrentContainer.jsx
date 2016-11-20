import React, { Component, PropTypes } from 'react'
import { List } from 'react-mdl'
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
    const { torrents } = await this.props.deluge.web.updateUi(['id', 'name', 'eta', 'label', 'ratio', 'state', 'download_rate', 'progress', 'total_done', 'total_wanted', 'upload_rate'], this.props.filter)
    this.setState({ torrents: Object.values(torrents) })
  }

  renderTorrents() {
    return this.state.torrents.map((row, i) => (
      <TorrentItem
        key={i}
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
    return (<List >{this.renderTorrents()}</List>)
  }
}

export default TorrentContainer
