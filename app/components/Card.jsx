import React from 'react'
import classnames from 'classnames'
import s from './Card.css'

type CardProps = {
  className?: string,
  children: any,
  shadow?: number,
  title?: string,
}

const Card = ({ className, children, shadow, title, ...props }: CardProps) => (
  <div
    className={classnames(
      s.card,
      className,
      shadow !== 0 ? `mdl-shadow--${shadow}dp` : undefined,
      )}
    {...props}
  >
    <div className={s.title}>{title}</div>
    <pre className={s.message}>{children}</pre>
  </div>
)

Card.defaultProps = {
  className: '',
  shadow: 0,
  title: '',
}

export default Card
