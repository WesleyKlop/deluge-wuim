import React, { PropTypes } from 'react'
import s from './PageContent.scss'

const PageContent = ({ children }) => (
  <div className={s.pageContent}>{children}</div>
)

PageContent.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PageContent
