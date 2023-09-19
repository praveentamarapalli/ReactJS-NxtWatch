import {withRouter, Link} from 'react-router-dom'

import Popup from 'reactjs-popup'

import Cookies from 'js-cookie'

import {FaMoon} from 'react-icons/fa'
import {FiSun, FiLogOut} from 'react-icons/fi'
import {GiHamburgerMenu} from 'react-icons/gi'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'
import {AiFillHome, AiOutlineClose} from 'react-icons/ai'

import NxtWatchContext from '../../context/NxtWatchContext'

import {
  HeaderContainer,
  HeaderOptions,
  ProfileImage,
  Logo,
  LogoutButton,
  ThemeButton,
  LogoutIconButton,
  Text,
  ControllerContainer,
  CancelButton,
  ConfirmButton,
  PopupContainer,
  ProfileImageContainer,
  MenuButton,
  PopupBgContainer,
  NavItem,
  NavName,
  NavItemsContainer,
  NavLink,
  NavContainer,
  MenuPopUpBgContainer,
} from './styledComponents'

const Header = props => (
  <NxtWatchContext.Consumer>
    {value => {
      const {darkMode, toggleTheme, changeActiveTab, activeTab} = value
      const themeColor = darkMode ? '#000000' : '#ffffff'
      const textColor = darkMode ? '#ffffff' : '#000000'
      const popUpBg = darkMode ? '#000000' : '#ffffff'
      const activeTabBg = darkMode ? '#424242' : '#e2e8f0'
      const logoUrl = darkMode
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

      const onChangeTheme = () => {
        toggleTheme()
      }

      const onClickLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

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
        <HeaderContainer color={themeColor}>
          <Link to="/" onClick={changeTabHome}>
            <Logo src={logoUrl} alt="website logo" />
          </Link>
          <HeaderOptions>
            <ThemeButton onClick={onChangeTheme}>
              {darkMode ? (
                <FiSun size={25} color="white" />
              ) : (
                <FaMoon size={25} color="black" />
              )}
            </ThemeButton>
            <ProfileImageContainer>
              <ProfileImage
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
              />
            </ProfileImageContainer>
            <Popup
              modal
              trigger={
                <MenuButton>
                  <GiHamburgerMenu size={25} color={textColor} />
                </MenuButton>
              }
            >
              {close => (
                <MenuPopUpBgContainer bgColor={themeColor}>
                  <NavContainer>
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
                          bgColor={
                            activeTab === 'Trending' ? activeTabBg : 'none'
                          }
                        >
                          <SiYoutubegaming
                            size={20}
                            color={
                              activeTab === 'Trending' ? '#ff0b37' : '#909090'
                            }
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
                          bgColor={
                            activeTab === 'Gaming' ? activeTabBg : 'none'
                          }
                        >
                          <BiListPlus
                            size={20}
                            color={
                              activeTab === 'Gaming' ? '#ff0b37' : '#909090'
                            }
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
                            color={
                              activeTab === 'Saved' ? '#ff0b37' : '#909090'
                            }
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
                    <AiOutlineClose color={textColor} onClick={() => close()} />
                  </NavContainer>
                </MenuPopUpBgContainer>
              )}
            </Popup>
            <Popup modal trigger={<LogoutButton>Logout</LogoutButton>}>
              {close => (
                <PopupBgContainer>
                  <PopupContainer color={popUpBg}>
                    <Text color={textColor}>
                      Are you sure, you want to logout?
                    </Text>
                    <ControllerContainer>
                      <CancelButton onClick={() => close()}>
                        Cancel
                      </CancelButton>
                      <ConfirmButton onClick={onClickLogout}>
                        Confirm
                      </ConfirmButton>
                    </ControllerContainer>
                  </PopupContainer>
                </PopupBgContainer>
              )}
            </Popup>
            <Popup
              modal
              trigger={
                <LogoutIconButton onClick={onClickLogout}>
                  <FiLogOut size={25} color={textColor} />
                </LogoutIconButton>
              }
            >
              {close => (
                <PopupBgContainer>
                  <PopupContainer color={popUpBg}>
                    <Text color={textColor}>
                      Are you sure, you want to logout?
                    </Text>
                    <ControllerContainer>
                      <CancelButton onClick={() => close()}>
                        Cancel
                      </CancelButton>
                      <ConfirmButton onClick={onClickLogout}>
                        Confirm
                      </ConfirmButton>
                    </ControllerContainer>
                  </PopupContainer>
                </PopupBgContainer>
              )}
            </Popup>
          </HeaderOptions>
        </HeaderContainer>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default withRouter(Header)
