import {Component} from 'react'
import {SiYoutubegaming} from 'react-icons/si'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import FailureView from '../FailureView'
import Header from '../Header'
import GamingVideosItem from '../GamingVideosItem'
import Navigation from '../Navigation'
import NxtWatchContext from '../../context/NxtWatchContext'

import {
  AppGamingContainer,
  GamingContainer,
  RightSection,
  LeftSection,
  LoaderContainer,
  Heading,
  Icon,
  HeadingSection,
  GamingList,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GamingVideos extends Component {
  state = {
    gamingData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getGamingData()
  }

  getGamingData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.loading,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const formattedData = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        thumbnailUrl: eachVideo.thumbnail_url,
        title: eachVideo.title,
        viewsCount: eachVideo.view_count,
      }))
      this.setState({
        gamingData: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <LoaderContainer data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </LoaderContainer>
  )

  renderSuccessView = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {darkMode} = value
        const {gamingData} = this.state
        const iconBg = darkMode ? '#424242' : '#e2e8f0'
        const headingColor = darkMode ? '#ffffff' : '#000000'
        const headingSectionColor = darkMode ? '#212121 ' : '#f4f4f4'
        return (
          <>
            <HeadingSection color={headingSectionColor}>
              <Icon color={iconBg}>
                <SiYoutubegaming size={25} color="red" />
              </Icon>
              <Heading color={headingColor}>Gaming</Heading>
            </HeadingSection>
            <GamingList>
              {gamingData.map(eachItem => (
                <GamingVideosItem
                  key={eachItem.id}
                  gamingVidoeDetails={eachItem}
                />
              ))}
            </GamingList>
          </>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderFailureView = () => <FailureView onRetry={this.getGamingData} />

  renderGamingView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {darkMode} = value
          const backgroundColor = darkMode ? '#0f0f0f ' : '#f9f9f9'
          const appBgColor = darkMode ? '#000000' : '#ffffff'
          return (
            <AppGamingContainer bgColor={appBgColor}>
              <Header />
              <GamingContainer data-testid="gaming" bgColor={backgroundColor}>
                <LeftSection bgColor={backgroundColor}>
                  <Navigation />
                </LeftSection>
                <RightSection>{this.renderGamingView()}</RightSection>
              </GamingContainer>
            </AppGamingContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default GamingVideos
