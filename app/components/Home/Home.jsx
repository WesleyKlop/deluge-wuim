// @flow
import React from 'react'
import ExpandingFAB from '../ExpandingFAB'
import TorrentContainer from '../../containers/TorrentContainer'
import Deluge from '../../lib/Deluge/Deluge'

type HomeProps = {
  deluge: Deluge,
  filter: {},
  onAddFileClick: () => void,
  onAddUrlClick: () => void,
}

const Home = ({ deluge, filter, onAddFileClick, onAddUrlClick }: HomeProps) => (
  <div>
    <TorrentContainer
      deluge={deluge}
      filter={filter}
    />
    <ExpandingFAB
      name="add"
      options={[
        { name: 'file_upload', onClick: onAddFileClick },
        { name: 'link', onClick: onAddUrlClick },
      ]}
    />
  </div>
)

export default Home
