import React, { Component } from 'react'
import styled from 'styled-components'
import TimeFieldset from './time-fieldset'
import CheckboxSlider from './checkbox-slider'
import TimeShiftFieldset from './time-shift-fieldset'

const Container = styled.div`
  position: relative;
  width: 80%;
  min-width: 19rem;
  max-width: 40rem;
  padding: 0;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0;
  margin-top: 2.4rem;

  @media (min-width: 480px) {
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
  }
`

const H3 = styled.h3`
  position: absolute;
  top: -0.2rem;
  left: 0;
  z-index: 1000;
  font-size: 0.8rem;
  color: #d40;

  @media (min-width: 490px) {
    font-size: 1rem;
  }
`

// props: player, the youtube-player instance, from video-view.js
export default class VideoControls extends Component {
  state = {
    duration: null,
    loopActiveInterval: null,
    invalidLoopTimeError: null,
    startLoopAtTime: {
      minute: null,
      seconds: null,
    },
    endLoopAtTime: {
      minute: null,
      seconds: null,
    },
    startLoopAtTimeConverted: null,
    endLoopAtTimeConverted: null,
    shiftTime: null,
  }

  componentDidUpdate = async (prevProps, prevState) => {
    console.log('THE UPDATED STATE: ', this.state)
  }

  handleInputChange = e => {
    const { name, value } = e.target
    if (this.checkboxSlider.checked === true) {
      this.checkboxSlider.checked = false
      this.clearListenInterval()
    }
    const className = e.target.classList[0]
    if (className === 'startLoopAtTime') {
      this.handleLoopTimeStateUpdate(className, name, value)
    }
    if (className === 'endLoopAtTime') {
      this.handleLoopTimeStateUpdate(className, name, value)
    }
  }

  handleLoopTimeStateUpdate = async (stateField, name, value) => {
    if (name === 'minute') {
      const minutesToSeconds = value !== '' ? parseInt(value) * 60 : null
      await this.setState((prevState, state) => ({
        [stateField]: {
          minute: minutesToSeconds,
          seconds: prevState[stateField].seconds,
        },
      }))
      this.updateLoopTimeConvertedState(stateField)
    }
    if (name === 'seconds') {
      const seconds = value !== '' ? parseInt(value) : null
      await this.setState((prevState, state) => ({
        [stateField]: {
          minute: prevState[stateField].minute,
          seconds: seconds,
        },
      }))
      this.updateLoopTimeConvertedState(stateField)
    }
    this.checkValidLoopInterval()
  }

  updateLoopTimeConvertedState = async stateField => {
    const minute = this.state[stateField].minute
    const seconds = this.state[stateField].seconds
    let duration
    if (!this.state.duration) {
      duration = await this.props.player.getDuration()
      this.setState({
        duration,
      })
    }
    if (minute > 0) {
      this.setState({
        [stateField + 'Converted']: minute + seconds,
      })
    } else if (seconds > 0) {
      this.setState({
        [stateField + 'Converted']: seconds,
      })
    } else if (minute === null && seconds === null) {
      this.setState({
        [stateField + 'Converted']: null,
      })
    }
  }

  checkValidLoopInterval = () => {
    const { startLoopAtTimeConverted, endLoopAtTimeConverted } = this.state
    console.log('STARTTIME: ', startLoopAtTimeConverted)
    console.log('ENDTIME: ', endLoopAtTimeConverted)
    if (
      startLoopAtTimeConverted > this.state.duration ||
      endLoopAtTimeConverted > this.state.duration
    ) {
      this.setState({
        invalidLoopTimeError:
          "The time you've entered is not within the video's duration.",
      })
    } else if (
      endLoopAtTimeConverted &&
      endLoopAtTimeConverted < startLoopAtTimeConverted
    ) {
      this.setState({
        invalidLoopTimeError:
          'End Loop Time may not be less than Start Loop Time.',
      })
    } else if (this.state.invalidLoopTimeError !== null) {
      this.setState({
        invalidLoopTimeError: null,
      })
    }
  }

  handleLoopToggle = e => {
    const { startLoopAtTimeConverted } = this.state
    if (e.target.checked) {
      this.setListenInterval(startLoopAtTimeConverted)
    } else {
      this.clearListenInterval()
    }
  }

  setListenInterval = startLoopAtTime => {
    this.props.player.seekTo(startLoopAtTime)
    const newInterval = setInterval(this.trackVideoTime, 1000)
    this.setState({
      loopActiveInterval: newInterval,
    })
  }

  clearListenInterval = () => {
    clearInterval(this.state.loopActiveInterval)
  }

  trackVideoTime = () => {
    const { player } = this.props
    const { startLoopAtTimeConverted, endLoopAtTimeConverted } = this.state
    if (startLoopAtTimeConverted < endLoopAtTimeConverted) {
      this.loop(player, startLoopAtTimeConverted, endLoopAtTimeConverted)
    }
  }

  loop = async (player, startLoopAtTime, endLoopAtTime) => {
    const time = await player.getCurrentTime()
    const roundedTime = Math.round(time)
    if (roundedTime > endLoopAtTime) {
      player.seekTo(startLoopAtTime)
    }
  }

  handleShiftTime = e => {
    console.log('SHIFTIN')
    e.preventDefault()
    const { id, value } = e.target
    const updateValue = value !== '' ? parseInt(value) : null
    console.log('THE UPDATE VALUE: ', updateValue)
    if (id === 'shift-time-input') {
      this.setState({
        shiftTime: updateValue,
      })
    } else if (id === 'shift-time-btn') {
      if (typeof this.state.shiftTime === 'number') {
        this.updateLoopRange()
      }
    }
  }

  updateLoopRange = () => {
    const {
      shiftTime,
      startLoopAtTimeConverted,
      endLoopAtTimeConverted,
    } = this.state
    const newStart = startLoopAtTimeConverted + shiftTime
    const newEnd = endLoopAtTimeConverted + shiftTime
    this.setState({
      startLoopAtTimeConverted: newStart,
      endLoopAtTimeConverted: newEnd,
    })
  }

  notifyEnterValidLoopTimes = e => {
    this.setState({
      invalidLoopTimeError: 'You must enter a time range to loop over.',
    })
  }

  // That validTimeEntered is messy, figure out a better place to handle that.
  // Can use checkValidLoopInterval and breka up each of the checks inside of it
  // into individual functions. then place the truth/false result on state and pass it in
  // to the CheckboxSlider.
  render() {
    const {
      duration,
      invalidLoopTimeError,
      startLoopAtTimeConverted,
      endLoopAtTimeConverted,
    } = this.state
    const validTimeEntered =
      startLoopAtTimeConverted !== null &&
      endLoopAtTimeConverted !== null &&
      (startLoopAtTimeConverted < duration && endLoopAtTimeConverted < duration)
        ? true
        : false
    return (
      <Container>
        {invalidLoopTimeError ? (
          <H3>{this.state.invalidLoopTimeError}</H3>
        ) : null}
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
          <CheckboxSlider
            handleLoopToggle={this.handleLoopToggle}
            validTimeEntered={validTimeEntered}
            notifyEnterValidLoopTimes={this.notifyEnterValidLoopTimes}
            ref={x => (this.checkboxSlider = x)}
          />
          <TimeShiftFieldset
            legendText="Shift Loop Time:"
            handleShiftTime={this.handleShiftTime}
          />
        </Form>
      </Container>
    )
  }
}
