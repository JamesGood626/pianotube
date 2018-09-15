import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 6rem;
  height: 4rem;

  @media (min-width: 480px) {
    height: 10rem;
  }
`

export default ({ handleLoopToggle }) => {
  return (
    <Container>
      <label tabIndex={0} className="switch">
        Toggle Loop Checkbox
        <input type="checkbox" onChange={handleLoopToggle} />
        <span className="slider round" />
      </label>
    </Container>
  )
}
