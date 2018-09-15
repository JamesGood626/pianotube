import React from 'react'
import styled from 'styled-components'
import { Container, Fieldset, Input } from './time-fieldset'

const Button = styled.button`
  height: 2rem;
  width: 9rem;
  font-size: 0.8rem;
  color: #085078;
  background: #fcfffc;
`

export default ({ legendText, handleShiftTime }) => {
  return (
    <Container>
      <Fieldset>
        <legend tabIndex={0}>{legendText}</legend>
        <span>
          <label tabIndex={0} htmlFor="seconds">
            Seconds:
          </label>
          <Input
            id="shift-time-input"
            type="text"
            name="seconds"
            onChange={handleShiftTime}
          />
        </span>
        <span>
          <Button id="shift-time-btn" onClick={handleShiftTime}>
            Shift
          </Button>
        </span>
      </Fieldset>
    </Container>
  )
}
