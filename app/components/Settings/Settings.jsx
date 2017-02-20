// @flow
import React from 'react'
import { List } from 'react-mdl'

type SettingsProps = {
  children: HTMLElement[],
}

const Settings = ({ children }: SettingsProps) => (
  <List>{children}</List>
)

Settings.defaultProps = {}

export default Settings
