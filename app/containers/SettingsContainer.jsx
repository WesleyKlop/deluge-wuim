// @flow
import React, { Component, PropTypes } from 'react'
import { Icon } from 'react-mdl'
import Settings, { SettingsAction, SettingsButton, SettingsLink } from '../components/Settings'
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
      <SettingsButton onClick={this.handleClearCacheClick}>
        <Icon name="cached" />Clear caches
      </SettingsButton>
      <SettingsAction
        type="switch"
        value={this.state.rememberMe}
        onChange={this.handleRememberMeChange}
      ><Icon name="" />Remember password</SettingsAction>
      <SettingsLink
        href="https://github.com/WesleyKlop/deluge-wuim"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name="code" />Github
      </SettingsLink>
    </Settings>
  )
}

export default SettingsContainer
