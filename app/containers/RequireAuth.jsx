// @flow
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Deluge from '../lib/Deluge/Deluge'
import { setAuthenticated } from '../actions/session'

type RequireAuthProps = {
  setAuthenticated: (val: boolean) => void,
  authenticated: boolean,
  children: any,
}

class RequireAuth extends React.Component {

  static lastAuthCheck: number = 0

  static contextTypes = {
    deluge: PropTypes.instanceOf(Deluge),
    router: PropTypes.object,
  }

  componentWillMount(): void {
    this.accessCheck()
  }

  componentWillReceiveProps(nextProps: RequireAuthProps): void {
    if (this.props.authenticated !== nextProps.authenticated) {
      this.accessCheck(true)
    }
  }

  accessCheck(force: boolean = false): void {
    if (
      Date.now() - RequireAuth.lastAuthCheck < 15000
      && force === false
    ) {
      console.log('Skipping auth check')
      // Less than 15 seconds have passed since the last accessCheck so we're returning
      return
    }
    const { deluge, router } = this.context

    // Check if we are authenticated
    RequireAuth.lastAuthCheck = Date.now()
    deluge.auth.checkSession()
      .then((authenticated) => {
        this.props.setAuthenticated(authenticated)

        if (!authenticated) {
          router.transitionTo('/login')
          return
        }

        deluge.web.connected()
          .then((connected) => {
            if (!connected) {
              router.transitionTo('/connection')
            }
          })
      })
  }

  props: RequireAuthProps

  render() {
    const { children, authenticated } = this.props

    if (authenticated) {
      return children
    }

    return null
  }
}

const mapStateToProps = state => ({
  authenticated: state.session.authenticated,
})

const mapDispatchToProps = dispatch => ({
  setAuthenticated: val => dispatch(setAuthenticated(val)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RequireAuth)
