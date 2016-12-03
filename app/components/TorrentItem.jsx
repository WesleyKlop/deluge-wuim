// @flow
import React from 'react'
import s from './TorrentItem.css'

type Props = {
  name: string,
  eta: number,
  label?: string,
  ratio: number,
  state: string,
  progress: number,
  downloaded: number,
  size: number,
  complete: boolean,
}

const TorrentItem = ({
  name, eta, label, ratio, state, progress, downloaded, size, complete,
}: Props) => (
  <li className={`mdl-list__item mdl-list__item--three-line ${s.torrentItem}`}>
    <div className={`mdl-list__item-primary-content ${s.container}`}>
      <div className={s.torrentName}>{name}</div>
      <span
        className="mdl-list__item-text-body"
      >
        {state} •&nbsp;
        {!complete ? `${(downloaded / 1048576).toFixed(2)}/${(size / 1048576).toFixed(2)}MB(${progress}%)` : `${progress}%`}{downloaded ? null : `• ${eta}`}
        &nbsp;• {ratio.toFixed(3)}{label && ` • ${label}`}
      </span>
    </div>
  </li>
)

export default TorrentItem
