import React, { Component } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import VideoSearch from './video-search'
import { VideoListing } from '../styledComponents'

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

export default class VideoList extends Component {
  componentDidMount = () => {
    console.log('THE VIDEO DATA!!! ', this.props.videoData)
  }

  handleFilterVideos = e => {
    console.log('FILTER VIDEOS E: ', e)
  }

  render() {
    return (
      <div>
        <VideoSearch handleFilterVideos={this.handleFilterVideos} />
        {renderVideoList(
          this.props.videoData,
          this.props.currentVideoId,
          this.props.handleChangeVideo
        )}
      </div>
    )
  }
}

// <PaginationControls />
