// @flow
import React, { PropTypes, Component } from 'react'
import { IconButton, Menu, MenuItem } from 'react-mdl'
import { connect } from 'react-redux'
import type { Torrent } from '../lib/Deluge/types'

class TorrentControlsBar extends Component {

  static contextTypes = {
    deluge: PropTypes.object,
  }

  props: {
    selectedTorrent: Torrent,
  }

  toggleTorrent = () => {
    const { selectedTorrent: { hash, state } } = this.props
    const { deluge } = this.context

    if (!hash) {
      return
    }

    if (state === 'Paused') {
      deluge.core.resumeTorrent(hash)
    } else {
      deluge.core.pauseTorrent(hash)
    }
  }

  render() {
    const { selectedTorrent } = this.props

    if (!selectedTorrent) {
      return <div />
    }

    return (
      <div style={{ position: 'relative' }}>
        <IconButton
          name={selectedTorrent.state === 'Paused' ? 'play_arrow' : 'pause'}
          onClick={this.toggleTorrent}
          ripple
        />
        <IconButton name="more_vert" ripple id="torrent_options" />
        <Menu target="torrent_options" align="right" ripple>
          <MenuItem>Delete</MenuItem>
          <MenuItem>Kill self</MenuItem>
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  selectedTorrent: state.session.selectedTorrent,
})

export default connect(
  mapStateToProps,
)(TorrentControlsBar)
