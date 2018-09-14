import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;

  label {
    margin-right: 0.8rem;
    font-size: 1rem;
  }
`

const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  width: 11rem;
  height: 100%;
  border: none;
  // background: blue;

  legend {
    font-size: 1.2rem;
    margin-bottom: 0.4rem;
  }

  span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 7.2rem;
    margin-bottom: 1rem;
  }
`

const Input = styled.input`
  width: 2.2rem;
  height: 2.2rem;
  font-size: 1.1rem;
  background: transparent;
  border: 2px solid #fcfffc;
  color: #fcfffc;
  text-align: center;

  &:focus {
    outline: none;
    border: 2px solid #72e1d1;
  }
`

export default ({ legendText }) => {
  return (
    <Container>
      <Fieldset>
        <legend tabIndex={0}>{legendText}</legend>
        <span>
          <label tabIndex={0} for="seconds">
            Minute:
          </label>
          <Input type="text" name="seconds" />
        </span>
        <span>
          <label tabIndex={0} for="seconds">
            Seconds:
          </label>
          <Input type="text" name="seconds" />
        </span>
      </Fieldset>
    </Container>
  )
}
