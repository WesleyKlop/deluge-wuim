// @flow
import React from 'react'
import classnames from 'classnames'
import { ListItem } from 'react-mdl'
import s from './TorrentDetails/TorrentDetails.css'
import v from './TorrentDetailsListItem/TorrentDetailsListItem.css'
import type { Tracker } from '../lib/Deluge/types'

const TrackerList = ({ trackers }: { trackers: Tracker[] }) => (
  <ul className={classnames(s.listContainer, 'mdl-shadow--2dp')}>
    {trackers.map((tracker: Tracker) => (
      <ListItem key={tracker.url} className={classnames(v.element, v.fullWidth)}>
        {tracker.url}
      </ListItem>
    ))}
  </ul>
)

export default TrackerList
