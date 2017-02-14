// @flow
import React from 'react'

type SettingProps = {
  children: HTMLElement,
}

const Setting = ({ children }: SettingProps) => (
  <li>{children}</li>
)

Setting.defaultProps = {}

export default Setting
