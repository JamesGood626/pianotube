import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/layout'
import { PlaylistsContainer, VideoListing, H2 } from '../styledComponents'

const H2Adjusted = H2.extend`
  &::after {
    width: 5rem;
  }
`

const mapVideos = edges => {
  return edges.map(edge => {
    return (
      <Link
        key={edge.node.videoId}
        to={`/${edge.node.slug}/${edge.node.videoId}`}
      >
        <VideoListing>
          <h3>{edge.node.videoName}</h3>
        </VideoListing>
      </Link>
    )
  })
}

const PostCategoryList = ({ data, location }) => (
  <Layout locationPathname={location.pathname}>
    <H2Adjusted>Songs</H2Adjusted>
    <PlaylistsContainer>
      {mapVideos(data.allContentfulPianoVideo.edges)}
    </PlaylistsContainer>
  </Layout>
)

export default PostCategoryList

export const query = graphql`
  query($collectionAssociation: String!) {
    allContentfulPianoVideo(
      filter: { collectionAssociation: { eq: $collectionAssociation } }
    ) {
      edges {
        node {
          slug
          videoId
          videoName
          collectionAssociation
        }
      }
    }
  }
`
