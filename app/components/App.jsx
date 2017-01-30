// @flow
import React from 'react'
import {
  Layout,
  IconButton,
  Navigation,
  Drawer,
  Content,
  Snackbar,
  Icon,
  Spacer,
  HeaderRow,
} from 'react-mdl'
import Helmet from 'react-helmet'
import { Link, Match } from 'react-router'
import {
  HomeContainer,
  LoginContainer,
  ConnectionManagerContainer,
  AuthMatch,
  TorrentDetailsContainer,
  TorrentSearchBar,
  TorrentControlsBar,
  AddTorrentContainer,
} from '../containers'
import s from './App.css'

type AppProps = {
  authenticated: boolean,
  onDrawerLinkClick: () => void,
  snackbarActive: boolean,
  onSnackbarTimeout: () => void,
  snackbarText: string,
  helmet: Helmet,
  signOut: () => void,
  drawerButton: ?string,
  onDrawerButtonClick: () => void,
  title: string,
}

const App = ({
  authenticated,
  onDrawerLinkClick,
  snackbarActive,
  onSnackbarTimeout,
  snackbarText,
  helmet,
  signOut,
  drawerButton,
  onDrawerButtonClick,
  title,
}: AppProps) => (
  <Layout fixedHeader fixedDrawer>
    {helmet}
    <div className="mdl-layout__header">
      <IconButton
        className="mdl-layout__drawer-button"
        name={drawerButton}
        onClick={onDrawerButtonClick}
      />
      <HeaderRow title={title}>
        <Match exactly pattern="/" component={TorrentSearchBar} />
        <Match exactly pattern="/torrent" component={TorrentControlsBar} />
      </HeaderRow>
    </div>
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
        <a
          href="https://github.com/Wesleyklop/deluge-wuim"
          target="_blank"
          rel="noopener noreferrer"
        ><Icon name="code" />Github</a>
      </Navigation>
    </Drawer>
    <Content>
      <Match exactly pattern="/" component={HomeContainer} />
      <Match exactly pattern="/add" component={AddTorrentContainer} />
      <Match exactly pattern="/login" component={LoginContainer} />
      <Match exactly pattern="/connection" component={ConnectionManagerContainer} />
      <AuthMatch exactly pattern="/torrent" component={TorrentDetailsContainer} />
      <Snackbar
        active={snackbarActive}
        onTimeout={onSnackbarTimeout}
      >{snackbarText}</Snackbar>
    </Content>
  </Layout>
)

export default App
