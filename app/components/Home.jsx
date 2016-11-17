import React, { PropTypes } from 'react'

const Home = ({ children }) => (
  <div>{children}</div>
)

Home.propTypes = {
  children: PropTypes.node,
}

export default Home
