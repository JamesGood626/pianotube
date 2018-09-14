import React from 'react'
import styled from 'styled-components'
import { Container, Fieldset, Input } from './time-fieldset'

const Button = styled.button`
  height: 2rem;
  width: 9rem;
  font-size: 0.8rem;
  background: #fcfffc;
`

export default ({ legendText }) => {
  return (
    <Container>
      <Fieldset>
        <legend tabIndex={0}>{legendText}</legend>
        <span>
          <label tabIndex={0} for="seconds">
            Seconds:
          </label>
          <Input type="text" name="seconds" />
        </span>
        <span>
          <Button>Shift</Button>
        </span>
      </Fieldset>
    </Container>
  )
}
