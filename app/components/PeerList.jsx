// @flow
import React from 'react'
import classnames from 'classnames'
import s from './TorrentDetails/TorrentDetails.css'
import ListItem from './TorrentDetailsListItem'
import type { Peer } from '../lib/Deluge/types'

const formatLabel = (client, downSpeed, upSpeed) =>
  `${client} | ${downSpeed} ↓ ${upSpeed} ↑`

const PeerList = ({ peers }: { peers: Peer[] }) => (
  <ul className={classnames(s.listContainer, 'mdl-shadow--2dp')}>
    {peers.map((peer: Peer) => (
      <ListItem
        key={peer.ip}
        label={formatLabel(peer.client, peer.down_speed, peer.up_speed)}
        title={peer.ip}
        fullWidth
      />
    ))}
  </ul>
)

export default PeerList
