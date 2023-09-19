import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'
import {MdClose} from 'react-icons/md'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import VideoItem from '../VideoItem'
import FailureView from '../FailureView'
import Navigation from '../Navigation'
import Header from '../Header'

import NxtWatchContext from '../../context/NxtWatchContext'

import {
  AppHomeContainer,
  HomeContainer,
  Search,
  SearchButton,
  SearchContainer,
  RightSection,
  LeftSection,
  Banner,
  BannerContent,
  BannerDescription,
  BannerLogo,
  GetNowButton,
  VideosContainer,
  Heading,
  Description,
  RetryButton,
  LoaderContainer,
  NoVideosContainer,
  NoVideosImage,
  VideosList,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  emptyResults: 'EMPTYRESULTS',
}

class Home extends Component {
  state = {
    displayBanner: true,
    searchInput: '',
    videosData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getHomeVideosData()
  }

  getHomeVideosData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.loader,
    })

    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      if (data.videos.length > 0) {
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
          videosData: formattedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({
          apiStatus: apiStatusConstants.emptyResults,
        })
      }
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getHomeVideosData()
    }
  }

  onClickSearchIcon = () => {
    this.getHomeVideosData()
  }

  close = () => {
    this.setState({displayBanner: false})
  }

  renderLoadingView = () => (
    <LoaderContainer data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </LoaderContainer>
  )

  renderSuccessView = () => {
    const {videosData} = this.state

    return (
      <VideosList>
        {videosData.map(eachVideo => (
          <VideoItem key={eachVideo.id} videoDetails={eachVideo} />
        ))}
      </VideosList>
    )
  }

  onRetry = () => {
    this.setState(
      {
        searchInput: '',
      },
      this.getHomeVideosData,
    )
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderEmptyResultsView = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {darkMode} = value
        const textColor = darkMode ? '#ffffff' : '#000000'

        return (
          <NoVideosContainer>
            <NoVideosImage
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
            />
            <Heading color={textColor}>No Search results found</Heading>
            <Description color={textColor}>
              Try different key words or remove search filter
            </Description>
            <RetryButton onClick={this.onRetry}>Retry</RetryButton>
          </NoVideosContainer>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderVideosView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.emptyResults:
        return this.renderEmptyResultsView()
      default:
        return null
    }
  }

  render() {
    const {displayBanner, searchInput} = this.state

    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {darkMode} = value
          const backgroundColor = darkMode ? '#181818' : '#f9f9f9'
          const appBgColor = darkMode ? '#000000' : '#ffffff'

          return (
            <AppHomeContainer bgColor={appBgColor}>
              <Header />
              <HomeContainer data-testid="home" bgColor={backgroundColor}>
                <LeftSection bgColor={backgroundColor}>
                  <Navigation />
                </LeftSection>
                <RightSection>
                  <Banner
                    bgImage="https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png"
                    displayBanner={displayBanner}
                    data-testid="banner"
                  >
                    <BannerContent>
                      <BannerLogo
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                        alt="nxt watch logo"
                      />
                      <BannerDescription>
                        Buy NxtWatch Premium prepaid plans with UPI{' '}
                      </BannerDescription>
                      <GetNowButton>GET IT NOW</GetNowButton>
                    </BannerContent>
                    <MdClose onClick={this.close} data-testid="close" />
                  </Banner>
                  <VideosContainer>
                    <SearchContainer>
                      <Search
                        type="search"
                        placeholder="Search"
                        onChange={this.onChangeSearchInput}
                        onKeyDown={this.onEnterSearchInput}
                        value={searchInput}
                      />
                      <SearchButton
                        type="button"
                        data-testid="searchButton"
                        onClick={this.getHomeVideosData}
                      >
                        <BsSearch className="search-icon" />
                      </SearchButton>
                    </SearchContainer>
                    {this.renderVideosView()}
                  </VideosContainer>
                </RightSection>
              </HomeContainer>
            </AppHomeContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Home
