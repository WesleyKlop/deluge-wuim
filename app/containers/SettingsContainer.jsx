// @flow
import React, { Component } from 'react'
import Settings, { Setting } from '../components/Settings'
import { clearCaches } from '../lib/Helpers'

type SettingsContainerProps = {}

class SettingsContainer extends Component {

  props: SettingsContainerProps

  handleClearCacheClick = () => clearCaches()

  render = () => (
    <Settings>
      <Setting onClick={this.handleClearCacheClick}>Clear caches</Setting>
    </Settings>
  )
}

export default SettingsContainer
