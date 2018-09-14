import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const ContainerDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 6rem;
  padding-left: 5vw;
  padding-right: 5vw;
  background: #fcfffc;

  @media (max-width: 640px) {
    justify-content: center;
  }
`

const Header = ({ siteTitle }) => (
  <ContainerDiv>
    <div>
      <h1 style={{ fontSize: '2.4rem', margin: 0 }}>
        <Link
          to="/"
          style={{
            color: '#085078',
            textDecoration: 'none',
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </ContainerDiv>
)

export default Header
