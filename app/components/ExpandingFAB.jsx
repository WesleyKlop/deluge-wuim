// @flow
import React, { Component } from 'react'
import { FABButton, Icon } from 'react-mdl'
import classnames from 'classnames'
import s from './ExpandingFAB.css'

type Option = {
  name: string,
  onClick: () => void,
}

type State = {
  open: boolean,
}

type ExpandingFABProps = {
  name: string,
  options: Option[],
  onClick?: () => void,
}

class ExpandingFAB extends Component {

  static defaultProps = {
    onClick: undefined,
  }

  state: State = {
    open: false,
  }
  props: ExpandingFABProps

  handleClick = (onClick?: Function) => {
    this.setState({ open: !this.state.open })
    if (typeof onClick === 'function') {
      onClick()
    }
  }

  renderOptions = () => {
    const { open } = this.state
    return this.props.options
      .map(({ name, onClick, ...otherProps }: Option, i) => (
        <FABButton
          mini
          key={name}
          ripple
          primary
          onClick={() => this.handleClick(onClick)}
          className={s.optionFab}
          style={{ transitionDelay: `${open ? ((i + 1) * 25) + 80 : 0}ms` }}
          {...otherProps}
        >
          <Icon name={name} />
        </FABButton>
      ))
  }

  render() {
    const { name, onClick } = this.props
    const { open } = this.state
    return (
      <div className={s.container}>
        <div className={s.optionContainer}>
          <div className={classnames(s.optionHolder, { [s.open]: open })}>
            {this.renderOptions()}
          </div>
        </div>
        <FABButton
          ripple
          colored
          onClick={() => this.handleClick(onClick)}
          className={classnames(s.mainFab, { [s.rotated]: open })}
        >
          <Icon name={name} />
        </FABButton>
      </div>
    )
  }
}

export default ExpandingFAB
