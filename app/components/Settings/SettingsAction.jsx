// @flow
import React from 'react'
import { ListItem, ListItemContent, ListItemAction, Switch } from 'react-mdl'

type SettingProps = {
  children: HTMLElement,
  type: string,
  onChange: () => void,
  value: any,
}

const renderAction = (action: Action): React$Element => {
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
  <ListItem>
    <ListItemContent>
      {children}
    </ListItemContent>
    <ListItemAction>
      {renderAction({ type, value, onChange })}
    </ListItemAction>
  </ListItem>
)

export default SettingsAction
