// @flow
import React from 'react'
import { Card, CardTitle, CardText, CardActions, Button, Textfield, Switch } from 'react-mdl'

type Props = {
  onSubmit: () => void,
  error: ?string,
  inputRefCb: () => Textfield,
  rememberMe: boolean,
  onRememberMeChange: () => void,
}

const Login = ({ inputRefCb, onSubmit, error, onRememberMeChange, rememberMe }: Props) => (
  <Card shadow={2}>
    <form onSubmit={onSubmit} autoComplete="on">
      <CardTitle>Sign in</CardTitle>
      <CardText>
        <Textfield
          label="Password"
          floatingLabel
          placeholder="hunter2"
          autoComplete="current-password"
          type="password"
          name="password"
          ref={inputRefCb}
          error={error}
          autoFocus
        />
      </CardText>
      <CardActions
        border
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Button colored style={{ flex: '0 0 auto' }}>Sign In</Button>
        <Switch checked={rememberMe} onChange={onRememberMeChange}>Remember</Switch>
      </CardActions>
    </form>
  </Card>
)

export default Login
