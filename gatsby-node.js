/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulPianoVideo {
          edges {
            node {
              videoId
              slug
              collectionAssociation
            }
          }
        }
      }
    `).then(result => {
      result.data.allContentfulPianoVideo.edges.forEach(({ node }) => {
        createPage({
          path: `/${node.slug}/`,
          component: path.resolve(`./src/templates/playlist-listing.js`),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            collectionAssociation: node.collectionAssociation,
          },
        })
        createPage({
          path: `/${node.slug}/${node.videoId}`,
          component: path.resolve(`./src/templates/video-view.js`),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            collectionAssociation: node.collectionAssociation,
            videoId: node.videoId,
          },
        })
      })
      resolve()
    })
  })
}

// is logging slugs
// exports.createPages = ({ graphql, actions }) => {
//   // const { createPage } = actions
//   return new Promise((resolve, reject) => {
//     graphql(`
//       {
//         allContentfulBlogPosts {
//           edges {
//             node {
//               slug
//             }
//           }
//         }
//       }
//     `).then(result => {
//       console.log(JSON.stringify(result, null, 4))
//       resolve()
//     })
//   })
// }
