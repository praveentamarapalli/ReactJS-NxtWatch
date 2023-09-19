import React from 'react'

const NxtWatchContext = React.createContext({
  activeTab: 'Home',
  darkMode: false,
  savedVideos: [],
  changeActiveTabId: () => {},
  toggleTheme: () => {},
  addVideos: () => {},
})

export default NxtWatchContext
