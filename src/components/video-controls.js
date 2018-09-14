import React from 'react'
import styled from 'styled-components'
import TimeFieldset from './time-fieldset'

const Form = styled.form`
  display: flex;
  height: 9rem;
  width: 70vw;
  min-width: 30rem;
  max-width: 50rem;
  margin-top: -2rem;
  // background: lime;
`

export default () => {
  return (
    <Form>
      <TimeFieldset legendText="Start Loop Time:" />
      <TimeFieldset legendText="End Loop Time:" />
    </Form>
  )
}
