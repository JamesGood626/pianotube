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

const checkValidLoopTimes = state => {
  console.log('IN CHECK VALID LOOP TIMES')
  const { startLoopAtTime, endLoopAtTime } = state
  const startHasMinute = startLoopAtTime.minute > 0 ? true : false
  const startHasSeconds = startLoopAtTime.seconds > 0 ? true : false
  const endHasMinute = endLoopAtTime.minute > 0 ? true : false
  const endHasSeconds = endLoopAtTime.minute > 0 ? true : false
  console.log(startHasMinute)
  if (startHasMinute) {
    console.log('START DOES HAVE MINUTE')
    if (!endHasMinute || endLoopAtTime.minute < startLoopAtTime.minute) {
      return false
    } else {
      console.log('ABOUT TO RUN CONVERSION')
      return startAndEndTimeConvertedToSeconds(startLoopAtTime, endLoopAtTime)
    }
  }
  if (startHasSeconds) {
    console.log('RUNNING START DOES HAVE SECONDS')
    if (!endHasSeconds || endLoopAtTime.seconds < startLoopAtTime.seconds) {
      return {
        startTime: startLoopAtTime.seconds,
        endTime: endLoopAtTime.seconds,
      }
    }
  }
  return false
}

const startAndEndTimeConvertedToSeconds = (startLoopAtTime, endLoopAtTime) => {
  const startMinutes = parseInt(startLoopAtTime.minute)
  const startSeconds = parseInt(startLoopAtTime.seconds)
  const startLoopAtTimeConverted =
    startSeconds > 0 ? startMinutes * 60 + startSeconds : startMinutes * 60
  const endMinutes = parseInt(endLoopAtTime.minute)
  const endSeconds = parseInt(endLoopAtTime.seconds)
  const endLoopAtTimeConverted =
    endSeconds > 0 ? endMinutes * 60 + endSeconds : endMinutes * 60

  return {
    startTime: startLoopAtTimeConverted,
    endTime: endLoopAtTimeConverted,
  }
}

// props: player, the youtube-player instance, from video-view.js
export default class VideoControls extends Component {
  state = {
    loopActiveInterval: null,
    loopActiveStartTime: null,
    loopActiveEndTime: null,
    startLoopAtTime: {
      minute: null,
      seconds: null,
    },
    endLoopAtTime: {
      minute: null,
      seconds: null,
    },
  }

  componentDidUpdate = (prevProps, prevState) => {
    console.log('THE UPDATED STATE: ', this.state)
  }

  handleInputChange = e => {
    const { name, value } = e.target
    const className = e.target.classList[0]
    if (className === 'startLoopAtTime') {
      this.handleLoopTimeStateUpdate(className, name, value)
    }
    if (className === 'endLoopAtTime') {
      this.handleLoopTimeStateUpdate(className, name, value)
    }
  }

  handleLoopTimeStateUpdate = (stateField, name, value) => {
    if (name === 'minute') {
      this.setState((prevState, state) => ({
        [stateField]: {
          ...prevState[stateField],
          minute: value,
        },
      }))
    } else if (name === 'seconds') {
      this.setState((prevState, state) => ({
        [stateField]: {
          ...prevState[stateField],
          seconds: value,
        },
      }))
    }
  }

  handleLoopToggle = e => {
    const result = checkValidLoopTimes(this.state)
    if (result) {
      console.log('THE RESULT: ', result)
      const checked = e.target.checked
      if (checked) {
        this.setListenInterval(result)
      } else {
        this.clearListenInterval()
      }
    }
  }

  setListenInterval = ({ startTime, endTime }) => {
    console.log('setting the interval: ', startTime)
    this.props.player.seekTo(startTime)
    const newInterval = setInterval(this.trackVideoTime, 1000)
    this.setState({
      loopActiveInterval: newInterval,
      loopActiveStartTime: startTime,
      loopActiveEndTime: endTime,
    })
  }

  clearListenInterval = () => {
    console.log(this.state.loopActiveInterval)
    // this.props.player.seekTo(startTime)
    clearInterval(this.state.loopActiveInterval)
  }

  trackVideoTime = async () => {
    const { player } = this.props
    const { loopActiveStartTime, loopActiveEndTime } = this.state
    if (loopActiveStartTime > 0 && loopActiveEndTime > 0) {
      const time = await player.getCurrentTime()
      const roundedTime = Math.round(time)
      console.log('THE ROUNDED TIME: ', roundedTime)
      console.log('loopActiveEndTime: ', loopActiveEndTime)
      if (roundedTime > loopActiveEndTime) {
        player.seekTo(loopActiveStartTime)
      }
    }
  }

  render() {
    return (
      <Form>
        <TimeFieldset
          legendText="Start Loop Time:"
          className="startLoopAtTime"
          handleInputChange={this.handleInputChange}
        />
        <TimeFieldset
          className="endLoopAtTime"
          legendText="End Loop Time:"
          handleInputChange={this.handleInputChange}
        />
        <CheckboxSlider handleLoopToggle={this.handleLoopToggle} />
        <TimeShiftFieldset legendText="Shift Loop Time:" />
      </Form>
    )
  }
}
