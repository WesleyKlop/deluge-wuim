import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { Layout, Header, Navigation, Drawer, Content, Textfield, Snackbar } from 'react-mdl'
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
    <Link to="/connection">Connection Manager</Link>
  </Navigation>
)

AppNavigation.propTypes = {
  hidePhone: PropTypes.bool,
  hideDesktop: PropTypes.bool,
}

const App = ({
  children,
  searchValue,
  onSearchChange,
  snackbarActive,
  onSnackbarTimeout,
  snackbarText,
}) => (
  <Layout fixedHeader>
    <Header title={'Deluge WUIM'}>
      <AppNavigation hidePhone />
      <Textfield
        value={searchValue}
        onChange={onSearchChange}
        label="Search"
        expandable
        expandableIcon="search"
        type="text"
      />
    </Header>
    <Drawer title="Deluge WUIM">
      <AppNavigation hideDesktop />
    </Drawer>
    <Content>
      {children}
      <Snackbar
        active={snackbarActive}
        onTimeout={onSnackbarTimeout}
      >{snackbarText}</Snackbar>
    </Content>
  </Layout>
)

App.propTypes = {
  children: PropTypes.node,
  searchValue: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  snackbarActive: PropTypes.bool.isRequired,
  onSnackbarTimeout: PropTypes.func.isRequired,
  snackbarText: PropTypes.string.isRequired,
}

export default App
