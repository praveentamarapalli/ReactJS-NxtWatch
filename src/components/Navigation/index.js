import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'
import {AiFillHome} from 'react-icons/ai'

import NxtWatchContext from '../../context/NxtWatchContext'

import {
  NavLink,
  NavBar,
  NavItem,
  NavName,
  NavItemsContainer,
  ContactContainer,
  SocialContainer,
  Image,
  Description,
  ContactHeading,
} from './styledComponents'

const Navigation = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {darkMode, changeActiveTab, activeTab} = value
      const themeColor = darkMode ? '#000000' : '#ffffff'
      const textColor = darkMode ? '#ffffff' : '#000000'
      const activeTabBg = darkMode ? '#424242' : '#e2e8f0'

      const changeTabHome = () => {
        changeActiveTab('Home')
      }

      const changeTabTrending = () => {
        changeActiveTab('Trending')
      }

      const changeTabGaming = () => {
        changeActiveTab('Gaming')
      }

      const changeTabSavedVideos = () => {
        changeActiveTab('Saved')
      }

      return (
        <>
          <NavBar color={themeColor}>
            <NavItemsContainer>
              <NavLink to="/">
                <NavItem
                  onClick={changeTabHome}
                  bgColor={activeTab === 'Home' ? activeTabBg : 'none'}
                >
                  <AiFillHome
                    size={20}
                    color={activeTab === 'Home' ? '#ff0b37' : '#909090'}
                  />
                  <NavName
                    color={textColor}
                    bold={activeTab === 'Home' ? 'bold' : 'none'}
                  >
                    Home
                  </NavName>
                </NavItem>
              </NavLink>
              <NavLink to="/trending">
                <NavItem
                  onClick={changeTabTrending}
                  bgColor={activeTab === 'Trending' ? activeTabBg : 'none'}
                >
                  <SiYoutubegaming
                    size={20}
                    color={activeTab === 'Trending' ? '#ff0b37' : '#909090'}
                  />
                  <NavName
                    color={textColor}
                    bold={activeTab === 'Trending' ? 'bold' : 'none'}
                  >
                    Trending
                  </NavName>
                </NavItem>
              </NavLink>
              <NavLink to="/gaming">
                <NavItem
                  onClick={changeTabGaming}
                  bgColor={activeTab === 'Gaming' ? activeTabBg : 'none'}
                >
                  <BiListPlus
                    size={20}
                    color={activeTab === 'Gaming' ? '#ff0b37' : '#909090'}
                  />
                  <NavName
                    color={textColor}
                    bold={activeTab === 'Gaming' ? 'bold' : 'none'}
                  >
                    Gaming
                  </NavName>
                </NavItem>
              </NavLink>
              <NavLink to="/saved-videos">
                <NavItem
                  onClick={changeTabSavedVideos}
                  bgColor={activeTab === 'Saved' ? activeTabBg : 'none'}
                >
                  <HiFire
                    size={20}
                    color={activeTab === 'Saved' ? '#ff0b37' : '#909090'}
                  />
                  <NavName
                    color={textColor}
                    bold={activeTab === 'Saved' ? 'bold' : 'none'}
                  >
                    Saved Videos
                  </NavName>
                </NavItem>
              </NavLink>
            </NavItemsContainer>
            <ContactContainer>
              <ContactHeading color={textColor}>Contact Us</ContactHeading>
              <SocialContainer>
                <a href="https://www.facebook.com/" target="__blank">
                  <Image
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                  />
                </a>
                <a href="https://twitter.com/" target="__blank">
                  <Image
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                  />
                </a>
                <a href="https://www.linkedin.com/" target="__blank">
                  <Image
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                  />
                </a>
              </SocialContainer>
              <Description color={textColor}>
                Enjoy! Now to see your channels and recommendations!
              </Description>
            </ContactContainer>
          </NavBar>
        </>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default Navigation
