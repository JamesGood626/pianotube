import React, { Component } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import VideoSearch from './video-search'
import { PlaylistsContainer, VideoListing } from '../styledComponents'

const renderVideoList = (videoDataArr, currentVideoId, handleChangeVideo) => {
  return videoDataArr.map(
    ({ node: { videoId, videoName, collectionAssociation, slug } }) => {
      return videoId !== currentVideoId ? (
        <Link key={`${slug}-video-view-list`} to={`/${slug}/${videoId}`}>
          <VideoListing id={videoId} onClick={handleChangeVideo}>
            <h4>{videoName}</h4>
            <p>{collectionAssociation}</p>
          </VideoListing>
        </Link>
      ) : null
    }
  )
}

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
    console.log('GOT i: ', i)
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
    currentPage: 0,
    numberOfPages: 0,
    pages: {},
  }

  componentDidMount = () => {
    const { videoData } = this.props
    console.log('THE VIDEO DATA!!! ', videoData)
    const pageCount = determineRequiredPages(videoData)
    const paginationArrays = createPaginationArrays(videoData, pageCount, 9)
    console.log('THE PAGINATION ARRAYS!!! :', paginationArrays)
  }

  handleFilterVideos = e => {
    console.log('FILTER VIDEOS E: ', e)
  }

  render() {
    return (
      <div>
        <VideoSearch handleFilterVideos={this.handleFilterVideos} />
        <PlaylistsContainer>
          {renderVideoList(
            this.props.videoData,
            this.props.currentVideoId,
            this.props.handleChangeVideo
          )}
        </PlaylistsContainer>
      </div>
    )
  }
}

// <PaginationControls />
