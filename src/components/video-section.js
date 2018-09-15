import React from 'react'
import styled from 'styled-components'

const VideoSection = styled.div`
  z-index: 0;
  height: 45.15vw;
  min-height: 10.5rem;
  max-height: 22.15rem;
  width: 80%;
  min-width: 19rem;
  max-width: 40rem;
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
  height: 100%;
  width: 100%;
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
