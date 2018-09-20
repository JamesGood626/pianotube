import React, { Component } from 'react'
// import { Link } from 'gatsby'
import styled from 'styled-components'
// import VideoSearch from './video-search'
import PaginationControls from './pagination-controls'
import PaginationVideoList from './pagination-video-list'
import { PlaylistsContainer } from '../styledComponents'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 4rem;
`

// const VideoListingTweaked = VideoListing.extend`
//   h3 {
//     height: 2.8rem;
//   }

//   p {
//     height: 1rem;
//   }
// `

const determineRequiredPages = videoArr => {
  const length = videoArr.length
  let pageCount = Math.floor(length / 9)
  if (length - pageCount * 9 !== 0) {
    pageCount++
  }
  return pageCount
}

const createPaginationArrays = (videoArr, pageCount, pageSize) => {
  let pageStart = 0
  let pageEnd = pageSize
  return videoArr.reduce((acc, video, i) => {
    if (pageStart < i && pageEnd >= i) {
      const currentPage = pageEnd / pageSize
      // this if else can certainly be broken out into a smaller function
      if (typeof acc[currentPage] === 'object') {
        acc[currentPage].push(video)
      } else {
        acc[currentPage] = [video]
      }
      // And quite possibly this one as well.
    } else if (i > pageEnd) {
      pageStart += pageSize
      pageEnd += pageSize
      const currentPage = pageEnd / pageSize
      // Oh yeah.. You used this twice now. you gotta break it out.
      if (typeof acc[currentPage] === 'object') {
        acc[currentPage].push(video)
      } else {
        acc[currentPage] = [video]
      }
    }
    return acc
  }, {})
}

// Just divide by nine to obtain the number of pages needed.
// Then if you run modulo operation and the result isn't zero,
// add on an extra page.

export default class VideoList extends Component {
  state = {
    currentPage: 1,
    numberOfPages: 0,
    pages: null,
  }

  componentDidMount = () => {
    const { videoData } = this.props
    const pageCount = determineRequiredPages(videoData)
    const paginationArrays = createPaginationArrays(videoData, pageCount, 9)
    this.setState({
      numberOfPages: pageCount,
      pages: paginationArrays,
    })
  }

  // componentDidUpdate = (prevProps, prevState) => {
  //   console.log('UPDATING VIDEO LIST STATE: ', this.state)
  // }

  // handleFilterVideos = e => {
  //   console.log('FILTER VIDEOS E: ', e)
  // }

  setStatePageForward = () => {
    if (this.state.currentPage + 1 <= this.state.numberOfPages) {
      this.setState((prevState, state) => ({
        currentPage: prevState.currentPage + 1,
      }))
    }
  }

  setStatePageBackward = () => {
    if (this.state.currentPage - 1 !== 0) {
      this.setState((prevState, state) => ({
        currentPage: prevState.currentPage - 1,
      }))
    }
  }

  handleChangePage = e => {
    const { id } = e.target
    if (id === 'forwards') {
      this.setStatePageForward()
    } else if (id === 'backwards') {
      this.setStatePageBackward()
    }
  }

  render() {
    const { pages, currentPage, numberOfPages } = this.state
    const nextOrPrevPageIndex =
      currentPage + 1 <= numberOfPages ? currentPage + 1 : currentPage - 1
    return (
      <Container>
        {/* <VideoSearch handleFilterVideos={this.handleFilterVideos} /> */}
        <PlaylistsContainer>
          {pages !== null ? (
            <PaginationVideoList
              videoDataArr={pages[currentPage]}
              nextVideoDataArr={pages[nextOrPrevPageIndex]}
              currentVideoId={this.props.currentVideoId}
              handleChangeVideo={this.props.handleChangeVideo}
              currentPage={currentPage}
            />
          ) : null}
        </PlaylistsContainer>
        <PaginationControls handleChangePage={this.handleChangePage} />
      </Container>
    )
  }
}
