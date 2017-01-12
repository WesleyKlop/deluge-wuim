import React from 'react'
import { Card, CardTitle, List, FABButton, Icon } from 'react-mdl'
import PageContent from './PageContent'

type ConnectionManagerProps = {
  children: Node,
  onFABClick: () => void,
  active: boolean,
}

const ConnectionManager = ({ children, onFABClick, active }: ConnectionManagerProps) => (
  <PageContent>
    <Card shadow={2}>
      <CardTitle>Connection Manager</CardTitle>
      <List>
        {children}
      </List>
    </Card>
    <FABButton
      colored
      ripple
      onClick={onFABClick}
      style={{
        transform: `rotate(${active ? -135 : 0}deg)`,
        transition: 'transform 150ms ease',
      }}
    >
      <Icon name="add" />
    </FABButton>
  </PageContent>
)

export default ConnectionManager
