import styled from 'styled-components'

export const H2 = styled.h2`
  position: relative;
  font-size: 1.8rem;
  color: #fcfffc;

  &::after {
    content: '';
    position: absolute;
    top: 110%;
    left: 2.2%;
    width: 7rem;
    height: 0.2rem;
    background: #fcfffc;
  }
`

export const PlaylistsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 100%;
  width: 80vw;
  padding-top: 1rem;

  @media (max-width: 640px) {
    justify-content: center;
  }
`

export const VideoListing = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 8rem;
  min-height: 8rem;
  max-width: 28rem;
  width: 40vw;
  min-width: 19rem;
  padding: 0.8rem;
  padding-top: 0;
  margin: 0 1rem 2rem 1rem;
  font-family: saira;
  color: #fcfffc;
  border: 1px solid #fcfffc;
  background: linear-gradient(60deg, #085078, #182848);
  box-shadow: 0px 0px 8px #fcfffc;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 8rem;
    max-width: 28rem;
    width: 40vw;
    min-width: 18rem;

    /* Create the box shadow at expanded size. */
    box-shadow: 0 0 10px 2px #72e1d1;

    /* Hidden by default. */
    opacity: 0;
    transition: opacity 500ms;
  }

  &:hover {
    border: 1px solid #72e1d1;
    box-shadow: 0px 0px 8px #72e1d1;
  }

  &:hover::after {
    /* Show the pseudo-element on hover. */
    opacity: 1;
  }
`
