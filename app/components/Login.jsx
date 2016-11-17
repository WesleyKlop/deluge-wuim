import React, { PropTypes } from 'react'
import { Card, CardTitle, CardText, CardActions, Button, Textfield } from 'react-mdl'


const Login = ({ inputRefCb, onSubmit, error }) => (
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

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  inputRefCb: PropTypes.func,
  error: PropTypes.string,
}

export default Login
