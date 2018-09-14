import React, { Component } from 'react'
import styled from 'styled-components'
import Layout from '../components/layout'
import YouTubePlayer from 'youtube-player'

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  background: linear-gradient(60deg, #085078, #182848);
`

const VideoSection = styled.section`
  display: flex;
  justify-content: center;
  height: 45.15vw;
  min-height: 16.91rem;
  max-height: 28.15rem;
  width: 100vw;
`

const VideoContainer = styled.div`
  position: relative;
  z-index: 0;
  width: 80%;
  /* Will have to adjust min-width w/ media queries to accomodate mobile */
  /* This is for desktop */
  min-width: 30rem;
  max-width: 50rem;
  height: 0;
`

const VideoHolder = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  width: 100%;
`

const VideoPlayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`

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
      <Layout>
        <div class="main-container">
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
