import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 4rem;
  width: 40vw;
`

const PaginationButton = styled.button`
  display: flex;
  justify-content: center;
  height: 2.6rem;
  width: 4.4rem;
  font-size: 1.2rem;
  margin-left: 1rem;
  margin-right: 1rem;
  color: #fcfffc;
  border: 2px solid #fcfffc;
  background: transparent;

  &:hover {
    background: #72e1d1;
  }
`

export default ({ handleChangePage }) => {
  return (
    <Container>
      <PaginationButton id="backwards" onClick={handleChangePage}>
        Prev
      </PaginationButton>
      <PaginationButton id="forwards" onClick={handleChangePage}>
        Next
      </PaginationButton>
    </Container>
  )
}
