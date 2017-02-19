// @flow
import React, { Component, PropTypes } from 'react'
import Settings, { SettingsAction, SettingsButton } from '../components/Settings'
import { clearCaches, rememberMe } from '../lib/Helpers'

type SettingsContainerProps = {}

class SettingsContainer extends Component {

  static contextTypes = {
    showSnackbar: PropTypes.func.isRequired,
  }

  state = {
    rememberMe: rememberMe(),
  }
  props: SettingsContainerProps

  handleClearCacheClick = () => {
    clearCaches()
    this.context.showSnackbar('Caches cleared')
  }
  handleRememberMeChange = () => {
    this.setState({ rememberMe: rememberMe(!this.state.rememberMe) })
  }

  render = () => (
    <Settings>
      <SettingsButton onClick={this.handleClearCacheClick}>Clear caches</SettingsButton>
      <SettingsAction
        type="switch"
        value={this.state.rememberMe}
        onChange={this.handleRememberMeChange}
      >Remember password</SettingsAction>
    </Settings>
  )
}

export default SettingsContainer
