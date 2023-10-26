import React from 'react'

const NxtWatchContext = React.createContext({
  activeTab: 'Home',
  darkMode: false,
  savedVideos: [],
  changeActiveTabId: () => {},
  toggleTheme: () => {},
  addVideo: () => {},
  removeVideo: () => {},
})

export default NxtWatchContext
