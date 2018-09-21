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

export default ({
  videoDataArr,
  nextVideoDataArr,
  currentVideoId,
  handleChangeVideo,
  currentPage,
}) => {
  return (
    <Container key={`video-list-page-${currentPage}`}>
      {videoDataArr.reduce(
        (
          acc,
          { node: { videoId, videoName, collectionAssociation, slug } }
        ) => {
          if (videoId !== currentVideoId) {
            acc.push(
              <Link key={`${slug}-video-view-list`} to={`/${slug}/${videoId}`}>
                <VideoListingTweaked id={videoId} onClick={handleChangeVideo}>
                  <h3>{videoName}</h3>
                  <p>{collectionAssociation}</p>
                </VideoListingTweaked>
              </Link>
            )
          } else {
            acc.push(
              <Link
                key={`${nextVideoDataArr[0].slug}-video-view-list`}
                to={`/${nextVideoDataArr[0].slug}/${
                  nextVideoDataArr[0].videoId
                }`}
              >
                <VideoListingTweaked
                  id={nextVideoDataArr[0].videoId}
                  onClick={handleChangeVideo}
                >
                  <h3>{nextVideoDataArr[0].videoName}</h3>
                  <p>{nextVideoDataArr[0].collectionAssociation}</p>
                </VideoListingTweaked>
              </Link>
            )
          }
          return acc
        },
        []
      )}
    </Container>
  )
}
