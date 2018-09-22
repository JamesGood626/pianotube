import React, { Component } from 'react'
import styled from 'styled-components'
import KeyCode from '../keyCodeConfig'

// const Span = styled.span`
//   display: block;
// `

// const DropDownContainerDiv = styled.div`
//   display: inline-block;
//   position: relative;
//   font-size: 16px;
//   height: 32px;
//   width: 12rem;
//   background: lime;
//   padding: 0;
// `

// const DropDownButton = styled.div`
//   background: #3498db;
//   width: 8rem;
//   color: #fff;
//   margin: 0;
//   letter-spacing: 0.025rem;
//   box-sizing: border-box;
//   padding: 10px 30px 10px 20px;
//   position: relative;
//   cursor: pointer;
//   transition: background 0.3s ease;

//   &:hover {
//     background: #2980b9;
//     transition: background 0.3s ease;
//   }
// `

// const Arrow = styled.span`
//   display: flex;
//   align-items: center;
//   font-size: 50%;
//   position: absolute;
//   right: 10px;
//   top: 0;
//   height: 37px;
//   // margin-top: auto;
//   // margin-bottom: auto;
//   color: #fff;
// `

// const ListBoxUl = styled.ul`
//   padding: 0;
//   list-style: none;
//   box-shadow: 0px 2px 6px 0 rgba(0, 0, 0, 0.2);
//   position: absolute;
//   top: 100%;
// `

// const OptionLi = styled.li`
//   background: #fff;
//   padding: 8px 10px 8px 15px;
//   box-sizing: border-box;
//   cursor: pointer;
//   transition: background 0.2s ease;
// `

// New problem to work on.... Need to create a revealing module pattern so that I can have multiple instances of
// aria dropdowns.... Go through and determine what code is entirely unnecessary.. and then move it into a separate file.
export default class DropDownListBox extends Component {
  state = {
    selectedValue: '',
    selectedElement: null,
    selectedValues: {},
    listboxOpen: false,
  }

  componentDidMount = () => {
    const { instance } = this.props
    const buttonId = `dropdown_button_${instance}`
    const listboxId = `listbox_list_${instance}`
    // "dropdown_button"
    const button = document.getElementById(buttonId)
    // "listbox_list"
    const listbox = new this.listBox(document.getElementById(listboxId))
    const listboxButton = new this.listboxButton(button, listbox)
  }

  /************************
   *
   *
   *
   * Listbox Button specific
   *
   *
   *
   ***********************/

  listboxButton = (button, listbox) => {
    this.button = button
    this.listbox = listbox
    this.registerListboxButtonEvents()
  }

  registerListboxButtonEvents = () => {
    this.button.addEventListener('click', this.toggleListboxShow.bind(this))
    this.arrow.addEventListener('click', this.toggleListboxShow.bind(this))
    this.button.addEventListener('keyup', this.checkShow.bind(this))
    this.listboxNode.addEventListener('blur', this.hideListbox.bind(this))
    this.listboxNode.addEventListener('keydown', this.checkHide.bind(this))
  }

  checkShow = evt => {
    var key = evt.which || evt.keyCode

    switch (key) {
      case KeyCode.UP:
      case KeyCode.DOWN:
        evt.preventDefault()
        this.showListbox()
        this.checkKeyPress(evt)
        break
    }
  }

  checkHide = evt => {
    var key = evt.which || evt.keyCode

    switch (key) {
      case KeyCode.RETURN:
      case KeyCode.ESC:
        evt.preventDefault()
        this.hideListbox()
        this.button.focus()
        break
    }
  }

  toggleListboxShow = () => {
    this.state.listboxOpen ? this.hideListbox() : this.showListbox()
    this.setState((prevState, state) => ({
      listboxOpen: !prevState.listboxOpen,
    }))
  }

  showListbox = () => {
    this.listboxNode.removeAttribute('class', 'hidden')
    this.button.setAttribute('aria-expanded', 'true')
    this.listboxNode.focus()
  }

  hideListbox = () => {
    this.listboxNode.setAttribute('class', 'hidden')
    this.button.removeAttribute('aria-expanded')
  }

  /*******************
   *
   *
   *
   *  Listbox specific
   *
   *
   *
   ******************/

  listBox = listboxNode => {
    this.listboxNode = listboxNode
    this.activeDescendant = this.listboxNode.getAttribute(
      'aria-activedescendant'
    )
    this.multiselectable = this.listboxNode.hasAttribute('aria-multiselectable')
    this.siblingList = null
    this.upButton = null
    this.downButton = null
    this.keysSoFar = ''
    this.handleFocusChange = function() {}
    this.handleItemChange = function(event, items) {}
    this.registerListboxEvents()
  }

  registerListboxEvents = function() {
    this.listboxNode.addEventListener('focus', this.setupFocus.bind(this))
    this.listboxNode.addEventListener('keydown', this.checkKeyPress.bind(this))
    this.listboxNode.addEventListener('click', this.checkClickItem.bind(this))
    this.listboxNode.addEventListener('touch', this.checkClickItem.bind(this))
  }

  setupFocus = () => {
    if (this.activeDescendant) {
      return
    }

    this.focusFirstItem()
  }

  focusFirstItem = () => {
    var firstItem

    firstItem = this.listboxNode.querySelector('[role="option"]')

    if (firstItem) {
      this.focusItem(firstItem)
    }
  }

  focusLastItem = () => {
    var itemList = this.listboxNode.querySelectorAll('[role="option"]')

    if (itemList.length) {
      this.focusItem(itemList[itemList.length - 1])
    }
  }

  checkKeyPress = evt => {
    var key = evt.which || evt.keyCode
    var nextItem = document.getElementById(this.activeDescendant)
    if (!nextItem) {
      return
    }

    switch (key) {
      case KeyCode.PAGE_UP:
      case KeyCode.UP:
      case KeyCode.DOWN:
        evt.preventDefault()
        if (key === KeyCode.UP) {
          nextItem = nextItem.previousElementSibling
        } else {
          nextItem = nextItem.nextElementSibling
        }

        if (nextItem) {
          this.focusItem(nextItem)
        }

        break
      case KeyCode.HOME:
        evt.preventDefault()
        this.focusFirstItem()
        break
      case KeyCode.END:
        evt.preventDefault()
        this.focusLastItem()
        break
      case KeyCode.SPACE:
        evt.preventDefault()
        this.toggleSelectItem(nextItem)
        break
      case KeyCode.RETURN:
        this.updateValues(this.activeDescendant, nextItem)
      case KeyCode.BACKSPACE:
      case KeyCode.DELETE:
      case KeyCode.RETURN:
        return
    }
  }

  checkClickItem = evt => {
    if (evt.target.getAttribute('role') === 'option') {
      this.focusItem(evt.target)
      this.toggleSelectItem(evt.target)
      this.hideListbox()
      this.updateValues(this.activeDescendant, evt.target)
      this.setState({
        listboxOpen: false,
        selectedValue: this.activeDescendant,
      })
    }
  }

  toggleSelectItem = element => {
    if (this.multiselectable) {
      element.setAttribute(
        'aria-selected',
        element.getAttribute('aria-selected') === 'true' ? 'false' : 'true'
      )
    }
  }

  defocusItem = function(element) {
    if (!element) {
      return
    }

    element.classList.remove('focused')
  }

  focusItem = element => {
    this.defocusItem(document.getElementById(this.activeDescendant))
    element.classList.add('focused')
    this.listboxNode.setAttribute('aria-activedescendant', element.id)
    this.activeDescendant = element.id

    if (this.listboxNode.scrollHeight > this.listboxNode.clientHeight) {
      var scrollBottom =
        this.listboxNode.clientHeight + this.listboxNode.scrollTop
      var elementBottom = element.offsetTop + element.offsetHeight
      if (elementBottom > scrollBottom) {
        this.listboxNode.scrollTop =
          elementBottom - this.listboxNode.clientHeight
      } else if (element.offsetTop < this.listboxNode.scrollTop) {
        this.listboxNode.scrollTop = element.offsetTop
      }
    }

    if (!this.multiselectable && this.moveButton) {
      this.moveButton.setAttribute('aria-disabled', false)
    }

    this.handleFocusChange(element)
  }

  addItems = items => {
    if (!items || !items.length) {
      return false
    }

    items.forEach(
      function(item) {
        this.defocusItem(item)
        this.toggleSelectItem(item)
        this.listboxNode.append(item)
      }.bind(this)
    )

    if (!this.activeDescendant) {
      this.focusItem(items[0])
    }

    this.handleItemChange('added', items)
  }

  deleteItems = () => {
    var itemsToDelete

    if (this.multiselectable) {
      itemsToDelete = this.listboxNode.querySelectorAll(
        '[aria-selected="true"]'
      )
    } else if (this.activeDescendant) {
      itemsToDelete = [document.getElementById(this.activeDescendant)]
    }

    if (!itemsToDelete || !itemsToDelete.length) {
      return []
    }

    itemsToDelete.forEach(
      function(item) {
        item.remove()

        if (item.id === this.activeDescendant) {
          this.clearActiveDescendant()
        }
      }.bind(this)
    )

    this.handleItemChange('removed', itemsToDelete)

    return itemsToDelete
  }

  clearActiveDescendant = () => {
    this.activeDescendant = null
    this.listboxNode.setAttribute('aria-activedescendant', null)

    if (this.moveButton) {
      this.moveButton.setAttribute('aria-disabled', 'true')
    }

    this.checkUpDownButtons()
  }

  moveUpItems = () => {
    var previousItem

    if (!this.activeDescendant) {
      return
    }

    const currentItem = document.getElementById(this.activeDescendant)
    previousItem = currentItem.previousElementSibling

    if (previousItem) {
      this.listboxNode.insertBefore(currentItem, previousItem)
      this.handleItemChange('moved_up', [currentItem])
    }

    this.checkUpDownButtons()
  }

  moveDownItems = () => {
    var nextItem

    if (!this.activeDescendant) {
      return
    }

    const currentItem = document.getElementById(this.activeDescendant)
    nextItem = currentItem.nextElementSibling

    if (nextItem) {
      this.listboxNode.insertBefore(nextItem, currentItem)
      this.handleItemChange('moved_down', [currentItem])
    }

    this.checkUpDownButtons()
  }

  moveItems = () => {
    if (!this.siblingList) {
      return
    }

    var itemsToMove = this.deleteItems()
    this.siblingList.addItems(itemsToMove)
  }

  setHandleItemChange = handlerFn => {
    this.handleItemChange = handlerFn
  }

  setHandleFocusChange = focusChangeHandler => {
    this.handleFocusChange = focusChangeHandler
  }

  updateValues = (activeDescendantValue, currentElement) => {
    if (this.state.selectedElement !== null) {
      this.state.selectedElement.setAttribute('aria-selected', 'false')
    }
    const button = document.querySelector('.dropdown-select-button')
    button.textContent = activeDescendantValue.replace(/^\w/, c =>
      c.toUpperCase()
    )
    currentElement.setAttribute('aria-selected', 'true')
    console.log('THE ACTIVE DESCENDANTVALUE! ', activeDescendantValue)
    this.props.setPlaybackRate(activeDescendantValue)
  }

  render() {
    const { instance } = this.props
    return (
      <div id="dropdown-select">
        <span id="exp_elem">Select Playback Speed:</span>
        <span className="triangle" ref={x => (this.arrow = x)}>
          &#9660;
        </span>
        <div
          tabIndex="0"
          aria-haspopup="listbox"
          aria-labelledby={`exp_elem dropdown_button_${instance}`}
          id={`dropdown_button_${instance}`}
          className="dropdown-select-button"
        >
          1.0
        </div>
        <ul
          id={`listbox_list_${instance}`}
          role="listbox"
          aria-labelledby={`dropdown_button_${instance}`}
          className="dropdown-selection hidden"
          tabIndex="-1"
        >
          <li role="option" id="0.25">
            0.25
          </li>
          <li role="option" id="0.50">
            0.50
          </li>
          <li role="option" id="0.75">
            0.75
          </li>
          <li role="option" id="1.0">
            1.00
          </li>
        </ul>
      </div>
    )
  }
}
