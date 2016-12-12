// @flow
import React from 'react'
import { Layout, Header, Navigation, Drawer, Content, Textfield, Snackbar, Icon, Spacer } from 'react-mdl'
import Helmet from 'react-helmet'
import { Link, Match, Miss } from 'react-router'
import { HomeContainer, LoginContainer, ConnectionManagerContainer } from '../containers'
import NotFound from './NotFound'
import s from './App.css'

type AppProps = {
  authenticated: boolean,
  searchValue: string,
  onSearchChange: () => void,
  onDrawerLinkClick: () => void,
  snackbarActive: boolean,
  onSnackbarTimeout: () => void,
  snackbarText: string,
  helmet: Helmet,
  signOut?: () => void,
}

const App = ({
  authenticated,
  searchValue,
  onSearchChange,
  onDrawerLinkClick,
  snackbarActive,
  onSnackbarTimeout,
  snackbarText,
  helmet,
  signOut,
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
    <Drawer title={<span className="mdl-layout--small-screen-only">Deluge WUIM</span>}>
      <Navigation>
        <Link
          onClick={onDrawerLinkClick}
          to="/"
          activeClassName={s.drawerLinkActive}
          activeOnlyWhenExact
        ><Icon name="home" />Torrents</Link>
        <Link
          onClick={onDrawerLinkClick}
          to="/connection"
          activeClassName={s.drawerLinkActive}
        ><Icon name="storage" />Connection Manager</Link>
        <Spacer />
        {authenticated
          ? <button
            onClick={signOut}
          ><Icon name="account_circle" />Logout</button>
          : <Link
            onClick={onDrawerLinkClick}
            to="/login"
            activeClassName={s.drawerLinkActive}
          ><Icon name="account_circle" />Login</Link>
        }
        <Link
          onClick={onDrawerLinkClick}
          to="/settings"
          activeClassName={s.drawerLinkActive}
        ><Icon name="settings" />Settings</Link>
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
