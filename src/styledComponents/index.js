import styled from 'styled-components'

export const PlaylistsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 100%;
  width: 90vw;
  padding-top: 1rem;
`

export const VideoListing = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 8rem;
  min-height: 8rem;
  width: 28rem;
  padding: 0.8rem;
  padding-top: 0;
  margin-bottom: 2rem;
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
    width: 28rem;

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
