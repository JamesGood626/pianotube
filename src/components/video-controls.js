import React, { Component } from 'react'
import styled from 'styled-components'
import TimeFieldset from './time-fieldset'
import CheckboxSlider from './checkbox-slider'
import TimeShiftFieldset from './time-shift-fieldset'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  min-width: 19rem;
  max-width: 40rem;
  margin-top: 2.4rem;

  @media (min-width: 480px) {
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
  }
`

// props: player, the youtube-player instance, from video-view.js
export default class VideoControls extends Component {
  state = {
    loopActive: false,
    startLoopAtTime: {
      minute: null,
      seconds: null,
    },
    endLoopAtTime: {
      minute: null,
      seconds: null,
    },
  }

  render() {
    return (
      <Form>
        <TimeFieldset legendText="Start Loop Time:" />
        <TimeFieldset legendText="End Loop Time:" />
        <CheckboxSlider />
        <TimeShiftFieldset legendText="Shift Loop Time:" />
      </Form>
    )
  }
}
