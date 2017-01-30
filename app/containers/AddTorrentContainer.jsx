import React, { PropTypes, Component } from 'react'
import AddTorrent from '../components/AddTorrent'

class AddTorrentContainer extends Component {

  static contextTypes = {
    setDrawerButton: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.context.setDrawerButton('arrow_back')
  }

  componentWillUnmount() {
    this.context.setDrawerButton('menu')
  }


  render() {
    return (
      <AddTorrent />
    )
  }
}

export default AddTorrentContainer
