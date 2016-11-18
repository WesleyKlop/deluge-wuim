import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { Layout, Header, Navigation, Drawer, Content, Textfield } from 'react-mdl'
import { Link } from 'react-router'

const AppNavigation = ({ hidePhone, hideDesktop }) => (
  <Navigation
    className={classnames({
      'mdl-layout--large-screen-only': hidePhone,
      'mdl-layout--small-screen-only': hideDesktop,
    })}
  >
    <Link to="/login">Login</Link>
    <Link to="/settings">Settings</Link>
  </Navigation>
)

AppNavigation.propTypes = {
  hidePhone: PropTypes.bool,
  hideDesktop: PropTypes.bool,
}


const App = ({ children }) => (
  <Layout fixedHeader>
    <Header title="Deluge WUIM">
      <AppNavigation hidePhone />
      <Textfield
        value=""
        onChange={() => {
        }}
        label="Search"
        expandable
        expandableIcon="search"
      />
    </Header>
    <Drawer title="Deluge WUIM">
      <AppNavigation hideDesktop />
    </Drawer>
    <Content>{children}</Content>
  </Layout>
)

App.propTypes = {
  children: PropTypes.node,
}

export default App
