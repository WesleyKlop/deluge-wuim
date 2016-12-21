// @flow
import React from 'react'
import s from './TorrentDetails.css'

type TorrentDetailsProps = {
  name: string,
}

const TorrentDetails = ({ name }: TorrentDetailsProps) => (
  <div className={s.content}>
    <h1 className={s.name}>{name}</h1>

  </div>
)

export default TorrentDetails
