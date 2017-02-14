// @flow
import React, { PropTypes, Component } from 'react'
import AddTorrent from '../components/AddTorrent'
import Deluge from '../lib/Deluge'
import type { TorrentInfo } from '../lib/Deluge/types'

type AddTorrentContainerProps = {
  location: {
    state: {
      type: string,
    }
  }
}

type AddTorrentContainerState = {
  torrent: ?TorrentInfo,
}

class AddTorrentContainer extends Component {

  static contextTypes = {
    setDrawerButton: PropTypes.func.isRequired,
    deluge: PropTypes.instanceOf(Deluge),
  }

  state: AddTorrentContainerState = {
    torrent: {
      name: '',
      info_hash: '',
    },
  }

  componentWillMount() {
    this.context.setDrawerButton('arrow_back')
  }

  componentDidMount() {
    const { type } = this.props.location.state

    switch (type) {
      case 'file':
        this.inputRef.click()
        break
      case 'url':
        this.requestMagnetUri()
        break
      default:
        console.warn('Unknown method %s', type)
        break
    }
  }

  componentWillUnmount() {
    this.context.setDrawerButton('menu')
  }

  inputRef: HTMLInputElement
  props: AddTorrentContainerProps

  requestMagnetUri = () => {
    const { deluge } = this.context
    // TODO: Don't use an ugly prompt
    const url = prompt('Enter magnet URI', 'magnet:?xt=urn:btih:9eae210fe47a073f991c83561e75d439887be3f3&dn=archlinux-2017.02.01-dual.iso&tr=udp://tracker.archlinux.org:6969&tr=http://tracker.archlinux.org:6969/announce') // eslint-disable-line no-alert

    if (typeof url !== 'string') {
      throw new Error('Did not receive URI')
    }

    deluge.web.getMagnetInfo(url)
      .then(info => this.handleReceivedTorrentInfo(info))
  }

  handleReceivedTorrentInfo = (torrent: TorrentInfo) => {
    if (torrent === false) {
      throw new Error('Invalid torrent or something')
    }
    console.log(torrent)
    this.setState({ torrent })
  }

  handleReceiveTorrentFile = (e: SyntheticChangeEvent) => {
    const [file] = e.target.files
    const { deluge } = this.context

    deluge.web.uploadTorrentFile(file)
      .then(path => deluge.web.getTorrentInfo(path))
      .then(info => this.handleReceivedTorrentInfo(info))
  }

  render() {
    return (
      // $FlowFixMe
      <AddTorrent >
        <input
          type="file"
          name="file"
          size="1"
          hidden
          ref={e => (this.inputRef = e)}
          onChange={this.handleReceiveTorrentFile}
          accept=".torrent, application/x-bittorrent"
        />
      </AddTorrent>
    )
  }
}

export default AddTorrentContainer
