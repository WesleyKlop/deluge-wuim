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
import { Route, Switch, NavLink } from 'react-router-dom'
import {
  HomeContainer,
  LoginContainer,
  ConnectionManagerContainer,
  AuthRoute,
  TorrentDetailsContainer,
  TorrentSearchBar,
  TorrentControlsBar,
  AddTorrentContainer,
  SettingsContainer,
} from '../../containers'
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
        <Route exact path="/" component={TorrentSearchBar} />
        <Route exact path="/torrent" component={TorrentControlsBar} />
      </HeaderRow>
    </div>
    <Drawer title={<span className="mdl-layout--small-screen-only">Deluge WUIM</span>}>
      <Navigation>
        <NavLink
          onClick={onDrawerLinkClick}
          to="/"
          activeClassName={s.drawerLinkActive}
        ><Icon name="home" />Torrents</NavLink>
        <NavLink
          onClick={onDrawerLinkClick}
          to="/connection"
          activeClassName={s.drawerLinkActive}
        ><Icon name="storage" />Connection Manager</NavLink>
        <Spacer />
        {authenticated
          ? <button
            onClick={signOut}
          ><Icon name="account_circle" />Logout</button>
          : <NavLink
            onClick={onDrawerLinkClick}
            to="/login"
            activeClassName={s.drawerLinkActive}
          ><Icon name="account_circle" />Login</NavLink>
        }
        <NavLink
          onClick={onDrawerLinkClick}
          to="/settings"
          activeClassName={s.drawerLinkActive}
        ><Icon name="settings" />Settings</NavLink>
        <a
          href="https://github.com/Wesleyklop/deluge-wuim"
          target="_blank"
          rel="noopener noreferrer"
        ><Icon name="code" />Github</a>
      </Navigation>
    </Drawer>
    <Content>
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route exact path="/settings" component={SettingsContainer} />
        <Route exact path="/add" component={AddTorrentContainer} />
        <Route exact path="/login" component={LoginContainer} />
        <Route exact path="/connection" component={ConnectionManagerContainer} />
        <AuthRoute exact path="/torrent" component={TorrentDetailsContainer} />
      </Switch>
      <Snackbar
        active={snackbarActive}
        onTimeout={onSnackbarTimeout}
      >{snackbarText}</Snackbar>
    </Content>
  </Layout>
)

export default App
