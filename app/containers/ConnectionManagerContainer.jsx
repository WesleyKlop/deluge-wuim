import React, { Component, PropTypes } from 'react'
import { Card, CardTitle, List, ListItem, ListItemContent, ListItemAction, IconButton } from 'react-mdl'
import { browserHistory } from 'react-router'
import PageContent from '../components/PageContent'
import Deluge from '../api/Deluge'

/**
 * ConnectionManagerContainer component
 * @property {Host[]} state.hosts
 */
class ConnectionManagerContainer extends Component {
  static contextTypes = {
    deluge: PropTypes.instanceOf(Deluge),
  }

  constructor() {
    super()

    this.addDelugeVersions = this.addDelugeVersions.bind(this)
    this.handleActionClick = this.handleActionClick.bind(this)
    this.handleContentClick = this.handleContentClick.bind(this)
  }

  state = {
    hosts: [],
  }

  async componentDidMount() {
    this.getHosts().then(hosts => this.setState({ hosts }, this.addDelugeVersions))
  }

  getHosts() {
    return this.context.deluge.web.getHosts()
  }

  async addDelugeVersions() {
    const hosts = await Promise.all(
      this.state.hosts.map(({ id }) => this.context.deluge.web.getHostStatus(id)),
    )

    this.setState({ hosts })
  }

  handleActionClick(e) {
    const { hostId } = e.currentTarget.dataset
    console.info('Connecting to host:', hostId)
    const host = this.state.hosts.find(({ id }) => id === hostId)

    switch (host.status) {
      case 'Online':
        this.context.deluge.web.connect(hostId)
          .then(() => browserHistory.push('/'))
        break
      case 'Connected':
        browserHistory.push('/')
        break
      case 'Offline':
        console.info('Should show a snackbar with something like "Daemon offline", even though this place shouldn\'t be reachable because the button is disabled')
        break
      default:
        console.warn(`Host has unknown status ${host.status}`)
    }
  }

  async handleContentClick(e) {
    const { hostId } = e.currentTarget.dataset
    const host = this.state.hosts.find(({ id }) => id === hostId)

    // Return on Offline hosts
    if (host.status === 'Offline') return

    console.info('Should update/remove this host:', host)
  }

  renderHosts() {
    return this.state.hosts.map((host) => {
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

  render() {
    return (
      <PageContent>
        <Card shadow={2}>
          <CardTitle>Connection Manager</CardTitle>
          <List>{this.renderHosts()}</List>
        </Card>
      </PageContent>
    )
  }
}

export default ConnectionManagerContainer
