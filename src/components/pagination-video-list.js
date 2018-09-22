import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { VideoListing } from '../styledComponents'

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 80vw;
`

const VideoListingTweaked = VideoListing.extend`
  h3 {
    height: 2.4rem;
  }
  p {
    height: 1rem;
  }
`

const renderVideoListing = (
  i,
  slug,
  videoId,
  videoName,
  collectionAssociation,
  handleChangeVideo
) => {
  return (
    <Link key={`${slug}-video-view-list=${i}`} to={`/${slug}/${videoId}`}>
      <VideoListingTweaked id={videoId} onClick={handleChangeVideo}>
        <h3>{videoName}</h3>
        <p>{collectionAssociation}</p>
      </VideoListingTweaked>
    </Link>
  )
}

const renderListings = (
  acc,
  i,
  node,
  nextVideoDataArr,
  currentVideoId,
  handleChangeVideo
) => {
  const { videoId, videoName, collectionAssociation, slug } = node
  if (videoId !== currentVideoId) {
    acc.push(
      renderVideoListing(
        i,
        slug,
        videoId,
        videoName,
        collectionAssociation,
        handleChangeVideo
      )
    )
  } else {
    const data = nextVideoDataArr[0].node
    acc.push(
      renderVideoListing(
        i,
        data.slug,
        data.videoId,
        data.videoName,
        data.collectionAssociation,
        handleChangeVideo
      )
    )
  }
}

export default ({
  videoDataArr,
  nextVideoDataArr,
  currentVideoId,
  handleChangeVideo,
  currentPage,
}) => {
  return (
    <Container key={`video-list-page-${currentPage}`}>
      {videoDataArr.reduce((acc, { node }, i) => {
        renderListings(
          acc,
          i,
          node,
          nextVideoDataArr,
          currentVideoId,
          handleChangeVideo
        )
        return acc
      }, [])}
    </Container>
  )
}
