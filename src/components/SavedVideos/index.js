import {Component} from 'react'
import {BiListPlus} from 'react-icons/bi'

import Header from '../Header'
import SavedVideosItem from '../SavedVideosItem'
import Navigation from '../Navigation'
import NxtWatchContext from '../../context/NxtWatchContext'

import {
  AppSavedVideosContainer,
  SavedVideosContainer,
  RightSection,
  LeftSection,
  Heading,
  Icon,
  HeadingSection,
  SavedVideosList,
  NoSavedVideosContainer,
  NoSavedVideosImage,
  Description,
} from './styledComponents'

class SavedVideos extends Component {
  renderSavedVideosView = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {darkMode, savedVideos, removeVideo} = value
        const iconBg = darkMode ? '#424242' : '#e2e8f0'
        const headingColor = darkMode ? '#ffffff' : '#000000'
        const headingSectionColor = darkMode ? '#212121 ' : '#f4f4f4'

        const deleteVideo = id => {
          removeVideo(id)
        }

        return (
          <>
            <HeadingSection color={headingSectionColor}>
              <Icon color={iconBg}>
                <BiListPlus size={30} color="red" />
              </Icon>
              <Heading color={headingColor}>Saved Videos</Heading>
            </HeadingSection>
            <SavedVideosList>
              {savedVideos.map(eachVideo => (
                <SavedVideosItem
                  key={eachVideo.id}
                  savedVideoDetails={eachVideo}
                  deleteVideo={deleteVideo}
                />
              ))}
            </SavedVideosList>
          </>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderNoSavedVideosView = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {darkMode} = value
        const headingColor = darkMode ? '#ffffff' : '#000000'
        return (
          <NoSavedVideosContainer>
            <NoSavedVideosImage
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="no saved videos"
            />
            <Heading color={headingColor}>No saved videos found</Heading>
            <Description>
              You can save your videos while watching them
            </Description>
          </NoSavedVideosContainer>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {darkMode, savedVideos} = value
          const backgroundColor = darkMode ? '#0f0f0f ' : '#f9f9f9'
          const appBgColor = darkMode ? '#000000' : '#ffffff'
          return (
            <AppSavedVideosContainer bgColor={appBgColor}>
              <Header />
              <SavedVideosContainer
                data-testid="savedVideos"
                bgColor={backgroundColor}
              >
                <LeftSection>
                  <Navigation />
                </LeftSection>
                <RightSection>
                  {savedVideos.length > 0
                    ? this.renderSavedVideosView()
                    : this.renderNoSavedVideosView()}
                </RightSection>
              </SavedVideosContainer>
            </AppSavedVideosContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default SavedVideos
