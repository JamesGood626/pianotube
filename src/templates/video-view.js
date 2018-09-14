import React, { Component } from 'react'
import styled from 'styled-components'
import Layout from '../components/layout'
import YouTubePlayer from 'youtube-player'

export default class VideoView extends Component {
  componentDidMount = async () => {
    console.log('Mounting VideoView')
    const { videoId } = this.props.data.allContentfulPianoVideo.edges[0].node
    await this.setState({ player: YouTubePlayer('video-player') })
    this.state.player.loadVideoById(videoId)
    console.log(this.state.player)
  }

  render() {
    return (
      <Layout locationPathname={this.props.location.pathname}>
        <div class="main-container">
          <nav>
            <a href="/">List</a>
            <a href="/view">View</a>
          </nav>
          <section class="video-section">
            <div class="video-container">
              <div class="video-holder">
                <div id="video-player" ref={x => (this.videoPlayer = x)} />
              </div>
            </div>
          </section>
        </div>
      </Layout>
    )
  }
}

export const query = graphql`
  query($videoId: String!) {
    allContentfulPianoVideo(filter: { videoId: { eq: $videoId } }) {
      edges {
        node {
          videoId
          videoName
        }
      }
    }
  }
`
