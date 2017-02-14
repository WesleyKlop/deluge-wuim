// @flow
import React from 'react'

type SettingsProps = {
  children: HTMLElement[],
}

const Settings = ({ children }: SettingsProps) => (
  <ul>{children}</ul>
)

Settings.defaultProps = {}

export default Settings
