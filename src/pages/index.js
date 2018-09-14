import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/layout'
import { PlaylistsContainer, VideoListing } from '../styledComponents'

const mapPlaylists = edges => {
  return edges.map(edge => {
    return (
      <Link key={edge.node.slug} to={`/${edge.node.slug}/`}>
        <VideoListing>
          <h3>{edge.node.collectionName}</h3>
        </VideoListing>
      </Link>
    )
  })
}

const IndexPage = ({ data, location }) => (
  <Layout locationPathname={location.pathname}>
    <PlaylistsContainer>
      {mapPlaylists(data.allContentfulCategories.edges)}
    </PlaylistsContainer>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query {
    allContentfulCategories {
      edges {
        node {
          slug
          collectionName
        }
      }
    }
  }
`
