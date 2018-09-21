import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 11rem;
  height: 3rem;
`

export default React.forwardRef(
  ({ validTimeEntered, handleLoopToggle, notifyEnterValidLoopTimes }, ref) => {
    return (
      <Container>
        <label
          tabIndex={0}
          className="switch"
          onClick={!validTimeEntered ? notifyEnterValidLoopTimes : null}
        >
          Toggle Loop Checkbox
          {validTimeEntered ? (
            <input type="checkbox" ref={ref} onChange={handleLoopToggle} />
          ) : (
            <input type="checkbox" disabled ref={ref} />
          )}
          <span className="slider round" />
        </label>
      </Container>
    )
  }
)
