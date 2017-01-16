// @flow
import React from 'react'
import classnames from 'classnames'
import { listContainer } from './TorrentDetails.css'
import ListItem from './TorrentDetailsListItem'
import { bytesToSize } from '../lib/Helpers'

type File = {
  index: number,
  path: string,
  priority: number,
  progress: number,
  size: number,
}

const formatTitle = (progress, size, priority): string =>
  `progress: ${Math.round(progress * 100)}% | priority: ${priority} | size: ${bytesToSize(size)}`

const FileList = ({ files }: { files: File[] }) => (
  <ul className={classnames(listContainer, 'mdl-shadow--2dp')}>
    {files.map(({ index, path, progress, size, priority }) => (
      <ListItem
        key={index}
        label={formatTitle(progress, size, priority)}
        title={path}
        fullWidth
      />
    ))}
  </ul>
)
export default FileList
