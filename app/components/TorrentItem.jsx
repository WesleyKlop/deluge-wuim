// @flow
import React from 'react'
import s from './TorrentItem.css'
import { bytesToSize, formatNumber } from '../lib/Helpers'

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
  onTorrentClick: () => void,
  hash: string,
}

const TorrentItem = ({
  name, eta, label, ratio, state, progress, downloaded, size, complete, onTorrentClick, hash,
}: Props) => (
  <li className={`mdl-list__item mdl-list__item--three-line ${s.torrentItem}`}>
    <button onClick={() => onTorrentClick(hash)} className={s.torrentItemButton}>
      <div className={`mdl-list__item-primary-content ${s.container}`}>
        <div className={s.torrentName}>{name}</div>
        <span className="mdl-list__item-text-body">
          {state} •&nbsp;
          {!complete ? `${bytesToSize(downloaded, true)}/${bytesToSize(size)}(${Math.round(progress)}%)` : `${progress}%`}{downloaded ? null : `• ${eta}`}
          &nbsp;• {formatNumber(ratio, 3)}{label && ` • ${label}`}
        </span>
      </div>
    </button>
  </li>
)

TorrentItem.defaultProps = {
  label: '',
}

export default TorrentItem
