import React from 'react'
import { Spinner } from 'react-mdl'
import { container } from './Loading.css'

const Loading = () => (
  <div className={container}>
    <Spinner />
  </div>
)

export default Loading
