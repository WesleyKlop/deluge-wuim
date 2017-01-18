// @flow
import React from 'react'

const Home = ({ children }: { children?: any}) => (
  <div>{children}</div>
)

Home.defaultProps = {
  children: undefined,
}

export default Home
