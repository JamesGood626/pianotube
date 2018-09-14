import React, { Component } from 'react'
import styled from 'styled-components'
import Layout from '../components/layout'
import YouTubePlayer from 'youtube-player'
import VideoSection from '../components/video-section'
import VideoControls from '../components/video-controls'

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin-top: 4rem;
`

export default class VideoView extends Component {
  componentDidMount = async () => {
    console.log('Mounting VideoView')
    const { videoId } = this.props.data.allContentfulPianoVideo.edges[0].node
    // await this.setState({ player: YouTubePlayer(this.videoPlayer) })
    // this.state.player.loadVideoById(videoId)
    // console.log(this.state.player)
  }

  render() {
    return (
      <Layout>
        <MainContainer>
          <VideoSection ref={x => (this.videoPlayer = x)} />
          <VideoControls />
        </MainContainer>
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
