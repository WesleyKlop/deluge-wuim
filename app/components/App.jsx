// @flow
import React from 'react'
import { Layout, Header, Navigation, Drawer, Content, Textfield, Snackbar, Icon } from 'react-mdl'
import { Link, Match, Miss } from 'react-router'
import { HomeContainer, LoginContainer, ConnectionManagerContainer } from '../containers'
import NotFound from './NotFound'

type AppProps = {
  searchValue: string,
  onSearchChange: () => void,
  onDrawerLinkClick: () => void,
  snackbarActive: boolean,
  onSnackbarTimeout: () => void,
  snackbarText: string,
  helmet: any,
}

const App = ({
  searchValue,
  onSearchChange,
  onDrawerLinkClick,
  snackbarActive,
  onSnackbarTimeout,
  snackbarText,
  helmet,
}: AppProps) => (
  <Layout fixedHeader fixedDrawer>
    <Header title="Deluge WUIM">
      <Match
        exactly
        pattern="/"
        render={() => (
          <Textfield
            value={searchValue}
            onChange={onSearchChange}
            label="Search"
            expandable
            expandableIcon="search"
            type="text"
          />
      )}
      />
    </Header>
    <Drawer>
      <Navigation onClick={onDrawerLinkClick}>
        <Link to="/"><Icon name="home" />Torrents</Link>
        <Link to="/login"><Icon name="account_circle" />Login</Link>
        <Link to="/settings"><Icon name="settings" />Settings</Link>
        <Link to="/connection"><Icon name="storage" />Connection Manager</Link>
      </Navigation>
    </Drawer>
    <Content>
      {helmet}
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
