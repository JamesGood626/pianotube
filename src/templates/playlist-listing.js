import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/layout'

const SectionContainer = styled.section`
  width: 90vw;
`

const mapVideos = edges => {
  return edges.map(edge => {
    return (
      <div>
        <Link
          key={edge.node.videoId}
          to={`/${edge.node.slug}/${edge.node.videoId}`}
        >
          <div>{edge.node.videoName}</div>
        </Link>
      </div>
    )
  })
}

const PostCategoryList = ({ data, location }) => (
  <Layout locationPathname={location.pathname}>
    <SectionContainer>
      {mapVideos(data.allContentfulPianoVideo.edges)}
    </SectionContainer>
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
