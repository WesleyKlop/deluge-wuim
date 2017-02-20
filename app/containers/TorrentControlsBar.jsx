// @flow
import React, { PropTypes, Component } from 'react'
import {
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Checkbox,
} from 'react-mdl'
import { connect } from 'react-redux'
import type { Torrent } from '../lib/Deluge/types'

class TorrentControlsBar extends Component {

  static contextTypes = {
    deluge: PropTypes.object,
    showSnackbar: PropTypes.func,
    router: PropTypes.object,
  }

  state = {
    deleteFiles: false,
    showDialog: false,
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

  handleDelete = () => {
    const { deluge, showSnackbar, router } = this.context
    const { deleteFiles } = this.state
    const { selectedTorrent: { hash } } = this.props
    console.log(deleteFiles, hash)
    deluge.core.removeTorrent(hash, deleteFiles)
      .then((success) => {
        const message = success ? 'Successfully removed torrent' : 'Failed to remove torrent'
        showSnackbar(message, () => router.replace('/'))
      })
  }

  toggleDeleteFiles = () => this.setState({ deleteFiles: !this.state.deleteFiles })
  cancelDelete = () => this.setState({ showDialog: false })
  showDeleteDialog = () => this.setState({ showDialog: true })

  render() {
    const { selectedTorrent } = this.props
    const { deleteFiles, showDialog } = this.state

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
          <MenuItem onClick={this.showDeleteDialog}>Delete</MenuItem>
          <MenuItem>Kill self</MenuItem>
        </Menu>
        <Dialog open={showDialog} onCancel={this.cancelDelete}>
          <DialogContent>
            <p>Remove this torrent?</p>
            <Checkbox label="With files" onClick={this.toggleDeleteFiles} checked={deleteFiles} />
          </DialogContent>
          <DialogActions>
            <Button ripple primary onClick={this.handleDelete}>Delete</Button>
            <Button ripple primary onClick={this.cancelDelete}>Cancel</Button>
          </DialogActions>
        </Dialog>
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
