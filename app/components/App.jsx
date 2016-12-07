// @flow
import React from 'react'
import classnames from 'classnames'
import { Layout, Header, Navigation, Drawer, Content, Textfield, Snackbar } from 'react-mdl'
import { Link, Match, Miss } from 'react-router'
import { HomeContainer, LoginContainer, ConnectionManagerContainer } from '../containers'
import NotFound from './NotFound'

const AppNavigation = ({
  hidePhone, hideDesktop,
}: {
  hidePhone?: boolean, hideDesktop?: boolean
}) => (
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

type AppProps = {
  searchValue: string,
  onSearchChange: () => void,
  snackbarActive: boolean,
  onSnackbarTimeout: () => void,
  snackbarText: string,
}

const App = ({
  searchValue,
  onSearchChange,
  snackbarActive,
  onSnackbarTimeout,
  snackbarText,
}: AppProps) => (
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
      <Match exactly pattern="/" component={HomeContainer} />
      <Match exactly pattern="/login" component={LoginContainer} />
      <Match exactly pattern="/connection" component={ConnectionManagerContainer} />
      <Miss component={NotFound} />
      <Snackbar
        active={snackbarActive}
        onTimeout={onSnackbarTimeout}
      >{snackbarText}</Snackbar>
    </Content>
  </Layout>
)

export default App
