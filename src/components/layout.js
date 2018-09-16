import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import Header from './header'
import './layout.css'

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  min-height: 100vh;
  width: 100vw;
`

const Layout = ({ children, currentView }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
        allContentfulPianoVideo {
          edges {
            node {
              videoId
              videoName
              slug
              collectionAssociation
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        >
          <html lang="en" />
          <link
            href="https://fonts.googleapis.com/css?family=Saira:300,400,600"
            rel="stylesheet"
          />
        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title} />
        {currentView === 'video-view' ? (
          <Main>{children(data.allContentfulPianoVideo.edges)}</Main>
        ) : (
          <Main>{children}</Main>
        )}
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
