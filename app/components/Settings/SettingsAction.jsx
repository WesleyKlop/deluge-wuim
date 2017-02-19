// @flow
import React from 'react'
import { ListItem, ListItemContent, ListItemAction, Switch } from 'react-mdl'
import s from './style.css'

type Action = {
  type: string,
  onChange: () => void,
  value: any,
}

type SettingProps = {
  children: HTMLElement,
  type: string,
  onChange: () => void,
  value: any,
}

const renderAction = (action: Action) => {
  switch (action.type) {
    case 'switch':
      return (
        <Switch ripple checked={action.value} onChange={action.onChange} />
      )
    default:
      return null
  }
}

const SettingsAction = ({ children, type, value, onChange }: SettingProps) => (
  <ListItem className={s.setting}>
    <ListItemContent>
      {children}
    </ListItemContent>
    <ListItemAction>
      {renderAction({ type, value, onChange })}
    </ListItemAction>
  </ListItem>
)

export default SettingsAction
