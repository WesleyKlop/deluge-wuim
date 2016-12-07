// @flow
import React from 'react'
import { Card, CardTitle, CardText, CardActions, Button, Textfield } from 'react-mdl'

type Props = {
  onSubmit: () => void,
  error: ?string,
  inputRefCb: () => Textfield
}

const Login = ({ inputRefCb, onSubmit, error }: Props) => (
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
      <CardActions border>
        <Button colored>Sign In</Button>
      </CardActions>
    </form>
  </Card>
)

export default Login
