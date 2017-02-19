// @flow
import React from 'react'
import classnames from 'classnames'
import s from './style.css'

type SettingsLinkProps = {
  children?: Node,
  href: string,
  className?: string,
}

const SettingsLink = ({ children, href, className, ...otherProps }: SettingsLinkProps) => (
  <li>
    <a
      href={href}
      className={classnames('mdl-list__item', s.listItemButton, s.setting, className)}
      {...otherProps}
    >
      {children || href}
    </a>
  </li>
)

SettingsLink.defaultProps = {
  children: undefined,
  className: '',
}

export default SettingsLink
