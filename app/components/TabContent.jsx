// @flow
import React from 'react'

type TabContentProps = {
  activeTab: number,
  children: HTMLElement[],
}

const TabContent = ({ children, activeTab }: TabContentProps) => (
  <div>{children[activeTab]}</div>
)

export default TabContent
