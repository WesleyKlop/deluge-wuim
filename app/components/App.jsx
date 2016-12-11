// @flow
import React from 'react'
import { Layout, Header, Navigation, Drawer, Content, Textfield, Snackbar } from 'react-mdl'
import { Link, Match, Miss } from 'react-router'
import { HomeContainer, LoginContainer, ConnectionManagerContainer } from '../containers'
import NotFound from './NotFound'

const AppNavigation = () => (
  <Navigation>
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
  <Layout fixedHeader fixedDrawer>
    <Header title={'Deluge WUIM'}>
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
      <AppNavigation />
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
