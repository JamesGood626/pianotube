import React from 'react'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;

  label {
    margin-right: 0.8rem;
    font-size: 1rem;
  }
`

export const Fieldset = styled.fieldset`
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

export const Input = styled.input`
  width: 2.2rem;
  height: 2.2rem;
  font-size: 1.1rem;
  background: transparent;
  border: 2px solid #fcfffc;
  color: #fcfffc;
  text-align: center;
  font-family: saira;

  &:focus {
    outline: none;
    border: 2px solid #72e1d1;
  }
`

export default ({ legendText, className, handleInputChange }) => {
  return (
    <Container>
      <Fieldset>
        <legend tabIndex={0}>{legendText}</legend>
        <span>
          <label tabIndex={0} htmlFor="minute">
            Minute:
          </label>
          <Input
            className={className}
            type="text"
            name="minute"
            onChange={handleInputChange}
          />
        </span>
        <span>
          <label tabIndex={0} htmlFor="seconds">
            Seconds:
          </label>
          <Input
            className={className}
            type="text"
            name="seconds"
            onChange={handleInputChange}
          />
        </span>
      </Fieldset>
    </Container>
  )
}
