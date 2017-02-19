// @flow
import React from 'react'
import classnames from 'classnames'
import s from './style.css'

type SettingsButtonProps = {
  children: HTMLElement,
  onClick: () => void,
}

const SettingsButton = ({ children, onClick }: SettingsButtonProps) => (
  <li>
    <button className={classnames('mdl-list__item', s.listItemButton, s.setting)} onClick={onClick}>
      {children}
    </button>
  </li>
)

export default SettingsButton
