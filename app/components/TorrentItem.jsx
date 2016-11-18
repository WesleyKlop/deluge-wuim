import React, { PropTypes } from 'react'
import s from './TorrentItem.css'

const TorrentItem = ({
  name, eta, label, ratio, state, progress, downloaded, size, complete,
}) => (
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

TorrentItem.propTypes = {
  name: PropTypes.string.isRequired,
  eta: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  ratio: PropTypes.number.isRequired,
  state: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  downloaded: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  complete: PropTypes.bool.isRequired,
}

export default TorrentItem
