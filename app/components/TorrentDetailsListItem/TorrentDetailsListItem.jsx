// @flow
import React from 'react'
import { ListItem, ListItemContent } from 'react-mdl'
import classnames from 'classnames'
import s from './TorrentDetailsListItem.css'

type TorrentDetailsListItemProps = {
  label: string,
  title: string,
  alignRight?: boolean,
  fullWidth?: boolean,
}

const TorrentDetailsListItem = ({
  label, title, alignRight = false, fullWidth = false,
}: TorrentDetailsListItemProps) => (
  <ListItem
    twoLine
    className={classnames(s.element, {
      [s.alignRight]: alignRight,
      [s.fullWidth]: fullWidth,
    })}
  >
    <ListItemContent subtitle={label}>{title}</ListItemContent>
  </ListItem>
)

TorrentDetailsListItem.defaultProps = {
  alignRight: false,
  fullWidth: false,
}

export default TorrentDetailsListItem
