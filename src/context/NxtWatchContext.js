import React from 'react'

const localStoredSavedVideosList = JSON.parse(
  localStorage.getItem('savedVideosList'),
)

const NxtWatchContext = React.createContext({
  activeTab: 'Home',
  darkMode: false,
  savedVideos:
    localStoredSavedVideosList === null ? [] : localStoredSavedVideosList,
  changeActiveTabId: () => {},
  toggleTheme: () => {},
  addVideo: () => {},
  removeVideo: () => {},
})

export default NxtWatchContext
