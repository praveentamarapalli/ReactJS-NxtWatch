import {Component} from 'react'
import Cookies from 'js-cookie'
import {HiFire} from 'react-icons/hi'
import Loader from 'react-loader-spinner'
import NxtWatchContext from '../../context/NxtWatchContext'

import FailureView from '../FailureView'
import Header from '../Header'
import Navigation from '../Navigation'
import TrendingVideosItem from '../TrendingVideosItem'

import {
  AppTrendingContainer,
  TrendingContainer,
  RightSection,
  LeftSection,
  LoaderContainer,
  Heading,
  Icon,
  HeadingSection,
  TrendingList,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TrendingVideos extends Component {
  state = {
    trendingData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrendingVideosData()
  }

  getTrendingVideosData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.loading,
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/trending'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const formattedData = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        channelName: eachVideo.channel.name,
        channelProfileLogo: eachVideo.channel.profile_image_url,
        publishedDate: eachVideo.published_at,
        thumbnailUrl: eachVideo.thumbnail_url,
        title: eachVideo.title,
        viewsCount: eachVideo.view_count,
      }))
      this.setState({
        trendingData: formattedData,
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
        const {trendingData} = this.state
        const iconBg = darkMode ? '#424242' : '#e2e8f0'
        const headingColor = darkMode ? '#ffffff' : '#000000'
        const headingSectionColor = darkMode ? '#212121 ' : '#f4f4f4'
        return (
          <>
            <HeadingSection color={headingSectionColor}>
              <Icon color={iconBg}>
                <HiFire size={30} color="red" />
              </Icon>
              <Heading color={headingColor}>Trending</Heading>
            </HeadingSection>
            <TrendingList>
              {trendingData.map(eachItem => (
                <TrendingVideosItem
                  key={eachItem.id}
                  trendingVideoDetails={eachItem}
                />
              ))}
            </TrendingList>
          </>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderFailureView = () => <FailureView onRetry={this.getTrendingVideosData} />

  renderTrendingView = () => {
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
            <AppTrendingContainer bgColor={appBgColor}>
              <Header />
              <TrendingContainer
                data-testid="trending"
                bgColor={backgroundColor}
              >
                <LeftSection bgColor={backgroundColor}>
                  <Navigation />
                </LeftSection>
                <RightSection>{this.renderTrendingView()}</RightSection>
              </TrendingContainer>
            </AppTrendingContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default TrendingVideos
