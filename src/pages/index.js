import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

const mapPlaylists = edges => {
  return edges.map(edge => {
    return (
      <Link key={edge.node.slug} to={`/${edge.node.slug}/`}>
        <div>{edge.node.collectionName}</div>
      </Link>
    )
  })
}

const IndexPage = ({ data, location }) => (
  <Layout locationPathname={location.pathname}>
    <div>{mapPlaylists(data.allContentfulCategories.edges)}</div>
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
