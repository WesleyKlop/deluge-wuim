import React, { PropTypes, Component } from 'react'
import AddTorrent from '../components/AddTorrent'
import Deluge from '../lib/Deluge'

type AddTorrentContainerProps = {
  location: {
    state: {
      type: string,
    }
  }
}

class AddTorrentContainer extends Component {

  static contextTypes = {
    setDrawerButton: PropTypes.func.isRequired,
    deluge: PropTypes.instanceOf(Deluge),
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
        // TODO DO SOMETHING WITh MAGNEt URL
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

  props: AddTorrentContainerProps

  requestMagnetUri = () => {
    const { deluge } = this.context
    // TODO: Don't use an ugly prompt
    const url = prompt('Enter magnet URI') // eslint-disable-line no-alert

    if (typeof url !== 'string') {
      throw new Error('Did not receive URI')
    }

    deluge.web.getMagnetInfo(url)
      .then(info => this.handleReceivedTorrentInfo(info))
  }

  handleReceivedTorrentInfo = (info) => {
    console.log(info)
  }

  handleReceiveTorrentFile = (e) => {
    const [file] = e.target.files
    const { deluge } = this.context

    deluge.web.uploadTorrentFile(file)
      .then(path => deluge.web.getTorrentInfo(path))
      .then(info => this.handleReceivedTorrentInfo(info))
  }

  render() {
    return (
      <AddTorrent>
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
