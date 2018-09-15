import React, { Component } from 'react'
import styled from 'styled-components'
import Layout from '../components/layout'
import YouTubePlayer from 'youtube-player'
import VideoSection from '../components/video-section'
import VideoControls from '../components/video-controls'

const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100vw;
  margin-top: 4rem;
`

export default class VideoView extends Component {
  state = {
    player: null,
    videoId: null,
  }

  componentDidMount = async () => {
    const { videoId } = this.props.data.allContentfulPianoVideo.edges[0].node
    const player = YouTubePlayer(this.videoPlayer)
    player.loadVideoById(videoId)
    this.setState({ player, videoId })
  }

  render() {
    return (
      <Layout>
        <MainContainer>
          <VideoSection ref={x => (this.videoPlayer = x)} />
          <VideoControls player={this.state.player} />
        </MainContainer>
      </Layout>
    )
  }
}
// Will have VideoListing component beneath controls, which will enable
// videoId to be updated on state in order to update current video.

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
