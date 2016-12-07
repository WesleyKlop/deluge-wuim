// @flow
import React, { Component, PropTypes } from 'react'
import { Card, CardTitle, List, ListItem, ListItemContent, ListItemAction, IconButton, FABButton, Icon, Textfield, Button } from 'react-mdl'
import PageContent from '../components/PageContent'
import Deluge from '../api/Deluge'
import s from './ConnectionManagerContainer.css'

type Host = {
  status: 'Online' | 'Offline' | 'Connected',
  id: string,
  port: number,
  ip: string,
  version?: string,
}

class ConnectionManagerContainer extends Component {
  static contextTypes = {
    deluge: PropTypes.instanceOf(Deluge),
    showSnackbar: PropTypes.func,
    router: PropTypes.object,
  }

  constructor() {
    super()

    this.addDelugeVersions = this.addDelugeVersions.bind(this)
    this.handleActionClick = this.handleActionClick.bind(this)
    this.handleContentClick = this.handleContentClick.bind(this)
    this.handleFABClick = this.handleFABClick.bind(this)
    this.handleAddHostClick = this.handleAddHostClick.bind(this)
  }

  state = {
    hosts: [],
    addHost: false,
  }

  state: {
    hosts: Array<Host>,
    addHost: boolean
  }

  componentDidMount(): void {
    this.updateHosts()
  }

  getHosts(): Promise<Host[]> {
    return this.context.deluge.web.getHosts()
  }

  addDelugeVersions: () => void
  handleActionClick: () => void
  handleContentClick: () => void
  handleFABClick: () => void
  handleAddHostClick: () => void

  updateHosts(): void {
    this.getHosts().then(hosts => this.setState({ hosts }, this.addDelugeVersions))
  }

  addHost = {}

  async addDelugeVersions(): Promise<void> {
    const hosts = await Promise.all(
      this.state.hosts.map(({ id }) => this.context.deluge.web.getHostStatus(id)),
    )

    this.setState({ hosts })
  }

  handleActionClick({ currentTarget }: { currentTarget: HTMLElement}): void {
    const { hostId } = currentTarget.dataset
    const { router } = this.context
    console.info('Connecting to host:', hostId)
    const host: ?Host = this.state.hosts.find(({ id }) => id === hostId)

    if (!host) {
      console.error('Couldn\'t find host')
      return
    }

    switch (host.status) {
      case 'Online':
        this.context.deluge.web.connect(hostId)
        .then(() => router.transitionTo('/'))
        break
      case 'Connected':
        router.transitionTo('/')
        break
      case 'Offline':
        console.info('Should show a snackbar with something like "Daemon offline", even though this place shouldn\'t be reachable because the button is disabled')
        break
      default:
        console.warn(`Host has unknown status ${host.status}`)
    }
  }

  async handleContentClick({ currentTarget }: { currentTarget: HTMLElement}): Promise<void> {
    const { hostId } = currentTarget.dataset
    const host: ?Host = this.state.hosts.find(({ id }) => id === hostId)

    // Return on Offline hosts
    if (!host || host.status === 'Offline') return

    console.info('Should update/remove this host:', host)
  }

  handleFABClick(): void {
    this.setState({ addHost: !this.state.addHost })
  }

  handleAddHostClick(): void {
    if (this.state.addHost === false) return

    const { hostRef, portRef, userRef, passRef } = this.addHost
    const host = hostRef.value.trim()
    const port = portRef.value.trim()
    const user = userRef.value.trim()
    const pass = passRef.value

    this.context.deluge.web.addHost(host, port, user, pass)
    .then((resp) => {
      if (resp) {
        this.context.showSnackbar(`Host ${host} succesfully added!`)
      } else {
        this.context.showSnackbar(`Error adding host ${host}`)
        return
      }
      this.setState({ addHost: false })
      this.updateHosts()
    })
  }

  renderHosts() {
    return this.state.hosts.map((host: Host) => {
      const disabled = host.status === 'Offline'
      const icon = host.status === 'Connected' ? 'navigate_next' : 'launch'
      return (
        <ListItem key={host.id} twoLine>
          <ListItemContent
            subtitle={`${host.status}${host.version ? ` • ${host.version} ` : ''}`}
            onClick={this.handleContentClick}
            data-host-id={host.id}
          >
            {`${host.ip}:${host.port}`}
          </ListItemContent>
          <ListItemAction>
            <IconButton
              name={icon}
              primary
              ripple
              onClick={this.handleActionClick}
              data-host-id={host.id}
              disabled={disabled}
              title={host.status}
            />
          </ListItemAction>
        </ListItem>
      )
    })
  }

  renderAddHost() {
    return (
      <ListItem key="addHost" className={s.addHostContainer}>
        <Textfield
          label="Host"
          type="text"
          floatingLabel
          pattern="^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$"
          error="Value must be a valid IP"
          className={s.inputHost}
          ref={e => (this.addHost.hostRef = e && e.inputRef)}
        />
        <Textfield
          type="number"
          label="Port"
          floatingLabel
          defaultValue="58846"
          size={5}
          className={s.inputPort}
          ref={e => (this.addHost.portRef = e && e.inputRef)}
        />
        <Textfield
          type="text"
          floatingLabel
          label="Username"
          autoComplete="username"
          className={s.inputUsername}
          ref={e => (this.addHost.userRef = e && e.inputRef)}
        />
        <Textfield
          type="password"
          floatingLabel
          label="Password"
          autoComplete="current-password"
          className={s.inputPassword}
          ref={e => (this.addHost.passRef = e && e.inputRef)}
        />
        <Button primary ripple onClick={this.handleAddHostClick}>Add host</Button>
      </ListItem>
    )
  }

  render() {
    return (
      <PageContent>
        <Card shadow={2}>
          <CardTitle>Connection Manager</CardTitle>
          <List>
            {this.state.addHost ? this.renderAddHost() : this.renderHosts()}
          </List>
        </Card>
        <FABButton
          colored
          ripple
          onClick={this.handleFABClick}
          style={{
            transform: `rotate(${this.state.addHost ? -45 : 0}deg)`,
            transition: 'transform 100ms ease',
          }}
        >
          <Icon name="add" />
        </FABButton>
      </PageContent>
    )
  }
}

export default ConnectionManagerContainer
