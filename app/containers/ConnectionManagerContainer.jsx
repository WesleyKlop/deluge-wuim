// @flow
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ListItem, ListItemContent, ListItemAction, Button, Textfield, IconButton } from 'react-mdl'
import ConnectionManager from '../components/ConnectionManager'
import Deluge from '../lib/Deluge/Deluge'
import s from '../components/ConnectionManager.css'
import { addHost, fetchHosts } from '../actions/hosts'
import type { Host } from '../lib/Deluge/types'

type addHostParams = {
  ip: string,
  port: number,
  username: string,
  password: string,
}

class ConnectionManagerContainer extends Component {
  static contextTypes = {
    deluge: PropTypes.instanceOf(Deluge),
    showSnackbar: PropTypes.func,
    router: PropTypes.object,
  }

  constructor() {
    super()

    this.handleActionClick = this.handleActionClick.bind(this)
    this.handleContentClick = this.handleContentClick.bind(this)
    this.handleFABClick = this.handleFABClick.bind(this)
    this.handleAddHostClick = this.handleAddHostClick.bind(this)
  }

  state = {
    addHost: false,
  }

  state: {
    addHost: boolean
  }

  componentWillMount() {
    this.props.fetchHosts()
  }

  props: {
    hosts: Host[],
    dispatchAddHost: () => Promise<boolean>,
    fetchHosts: () => void,
  }

  handleActionClick: () => void
  handleContentClick: () => void
  handleFABClick: () => void
  handleAddHostClick: () => void

  addHost = {}

  handleActionClick(hostId: string): void {
    const { router } = this.context
    console.info('Connecting to host:', hostId)
    const host: ?Host = this.props.hosts.find(({ id }) => id === hostId)

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

  async handleContentClick(hostId: string): Promise<void> {
    const host: ?Host = this.props.hosts.find(({ id }) => id === hostId)

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
    const host: string = hostRef.value.trim()
    const port: string = portRef.value.trim()
    const user: string = userRef.value.trim()
    const pass: string = passRef.value

    this.props.dispatchAddHost(host, port, user, pass)
      .then((resp: boolean) => {
        if (resp) {
          this.context.showSnackbar(`Host ${host} succesfully added!`)
        } else {
          this.context.showSnackbar(`Error adding host ${host}`)
          return
        }
        this.setState({ addHost: false })
      })
  }

  renderHosts() {
    return this.props.hosts.map((host: Host) => {
      const disabled = host.status === 'Offline'
      const icon = host.status === 'Connected' ? 'navigate_next' : 'launch'
      const handleActionClick = this.handleActionClick.bind(this, host.id)
      const handleContentClick = this.handleContentClick.bind(this, host.id)
      return (
        <ListItem key={host.id} twoLine>
          <ListItemContent
            subtitle={`${host.status}${host.version ? ` • ${host.version} ` : ''}`}
            onClick={handleContentClick}
          >
            {`${host.ip}:${host.port}`}
          </ListItemContent>
          <ListItemAction>
            <IconButton
              name={icon}
              primary
              ripple
              onClick={handleActionClick}
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
          autoComplete="off"
          className={s.inputHost}
          ref={e => (this.addHost.hostRef = e && e.inputRef)}
        />
        <Textfield
          type="number"
          label="Port"
          floatingLabel
          defaultValue="58846"
          size={5}
          autoComplete="off"
          className={s.inputPort}
          ref={e => (this.addHost.portRef = e && e.inputRef)}
        />
        <Textfield
          type="text"
          floatingLabel
          label="Username"
          autoComplete="off"
          className={s.inputUsername}
          ref={e => (this.addHost.userRef = e && e.inputRef)}
        />
        <Textfield
          type="password"
          floatingLabel
          label="Password"
          autoComplete="off"
          className={s.inputPassword}
          ref={e => (this.addHost.passRef = e && e.inputRef)}
        />
        <Button primary ripple onClick={this.handleAddHostClick}>Add host</Button>
      </ListItem>
    )
  }

  render() {
    return (
      <ConnectionManager
        onFABClick={this.handleFABClick}
        active={this.state.addHost}
      >
        {this.state.addHost ? this.renderAddHost() : this.renderHosts()}
      </ConnectionManager>
    )
  }
}

const mapStateToProps = state => ({
  hosts: state.hosts,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatchAddHost: (ip, port, username, password): addHostParams =>
    dispatch(addHost(ip, port, username, password)),
  fetchHosts: () => dispatch(fetchHosts()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectionManagerContainer)
