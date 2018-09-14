import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 6rem;
  height: 10rem;
`

export default () => {
  return (
    <Container>
      <label tabIndex={0} class="switch">
        Toggle Loop Checkbox
        <input type="checkbox" />
        <span class="slider round" />
      </label>
    </Container>
  )
}
