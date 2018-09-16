import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 4rem;
  width: 40vw;
`

const LeftArrow = styled.div`
  height: 4rem;
  width: 4rem;
  background: lime;
`

const RightArrow = styled.div`
  height: 4rem;
  width: 4rem;
  background: yellow;
`

export default ({ handleChangePage }) => {
  return (
    <Container>
      <LeftArrow id="backwards" onClick={handleChangePage}>
        L
      </LeftArrow>
      <RightArrow id="forwards" onClick={handleChangePage}>
        R
      </RightArrow>
    </Container>
  )
}
