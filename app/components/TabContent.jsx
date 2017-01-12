import React from 'react'

type TabContentProps = {
  activeTab: number,
  children: Array,
}

const TabContent = ({ children, activeTab }: TabContentProps) => (
  <div>{children[activeTab]}</div>
)

export default TabContent
