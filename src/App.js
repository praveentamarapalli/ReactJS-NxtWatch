import {Component} from 'react'

import {Switch, Route, Redirect} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'

import Login from './components/Login'

import Home from './components/Home'

import TrendingVideos from './components/TrendingVideos'

import GamingVideos from './components/GamingVideos'

import SavedVideos from './components/SavedVideos'

import VideoItemDetails from './components/VideoItemDetails'

import NotFound from './components/NotFound'

import NxtWatchContext from './context/NxtWatchContext'

import './App.css'

const localStoredSavedVideosList = JSON.parse(
  localStorage.getItem('savedVideosList'),
)

class App extends Component {
  state = {
    activeTab: 'Home',
    darkMode: false,
    savedVideos:
      localStoredSavedVideosList === null ? [] : localStoredSavedVideosList,
  }

  changeActiveTab = tab => {
    this.setState({
      activeTab: tab,
    })
  }

  toggleTheme = () => {
    this.setState(prevState => ({darkMode: !prevState.darkMode}))
  }

  addVideo = video => {
    const {savedVideos} = this.state
    const index = savedVideos.findIndex(eachVideo => eachVideo.id === video.id)
    if (index === -1) {
      this.setState({
        savedVideos: [...savedVideos, video],
      })
    } else {
      savedVideos.splice(index, 1)
      this.setState({savedVideos})
    }
  }

  removeVideo = id => {
    const {savedVideos} = this.state
    const filteredVideos = savedVideos.filter(eachVideo => eachVideo.id !== id)
    this.setState({
      savedVideos: filteredVideos,
    })
  }

  render() {
    const {activeTab, darkMode, savedVideos} = this.state

    localStorage.setItem('savedVideosList', JSON.stringify(savedVideos))

    return (
      <NxtWatchContext.Provider
        value={{
          activeTab,
          darkMode,
          savedVideos,
          changeActiveTab: this.changeActiveTab,
          toggleTheme: this.toggleTheme,
          addVideo: this.addVideo,
          removeVideo: this.removeVideo,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={TrendingVideos} />
          <ProtectedRoute exact path="/gaming" component={GamingVideos} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </NxtWatchContext.Provider>
    )
  }
}

export default App
