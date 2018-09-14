import React from 'react'
import styled from 'styled-components'

// These widths affect the video width.
// However, I've yet to find a solution that doesn't
// cut off a portion of the video during resizing.
const VideoSection = styled.div`
  position: relative;
  z-index: 0;
  height: 0;
  width: 70vw;
  min-width: 30rem;
  max-width: 50rem;
`

const VideoHolder = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  width: 100%;
`

const VideoPlayer = styled.div`
  position: absolute;
  height: 80%;
  width: 80%;

  @media (min-width: 600px) {
    height: 100%;
    width: 100%;
  }
`

export default React.forwardRef((props, ref) => {
  return (
    <VideoSection>
      <VideoHolder>
        <VideoPlayer innerRef={ref} />
      </VideoHolder>
    </VideoSection>
  )
})
