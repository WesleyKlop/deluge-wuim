// @flow
import React from 'react'
import s from './PageContent.css'

type Props = {
  children?: any
}

const PageContent = ({ children }: Props) => (
  <div className={s.pageContent}>{children}</div>
)

PageContent.defaultProps = {
  children: undefined,
}

export default PageContent
