import React, { PureComponent } from 'react'
import styled from 'styled-components'
import Layout from '../components/layout'
import YouTubePlayer from 'youtube-player'
import VideoSection from '../components/video-section'
import VideoControls from '../components/video-controls'
import VideoList from '../components/video-list'

const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100vw;
  margin-top: 4rem;
`

export default class VideoView extends PureComponent {
  state = {
    player: null,
    currentVideoId: null,
  }

  componentDidMount = async () => {
    console.log('THIS PROPS DATA: ', this.props.data)
    const { videoId } = this.props.data.allContentfulPianoVideo.edges[0].node
    const player = YouTubePlayer(this.videoPlayer)
    player.loadVideoById(videoId)
    console.log('THE PLAYER: ', player)
    this.setState({ player, currentVideoId: videoId })
  }

  componentDidUpdate = (prevProps, prevState) => {
    this.state.player.loadVideoById(this.state.currentVideoId)
  }

  handleChangeVideo = e => {
    this.setState({
      currentVideoId: e.target.id,
    })
  }

  render() {
    return (
      <Layout currentView={'video-view'}>
        {edges => (
          <MainContainer>
            <VideoSection ref={x => (this.videoPlayer = x)} />
            <VideoControls player={this.state.player} />
            <VideoList
              videoData={edges}
              handleChangeVideo={this.handleChangeVideo}
              currentVideoId={this.state.currentVideoId}
            />
          </MainContainer>
        )}
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
        }
      }
    }
  }
`
