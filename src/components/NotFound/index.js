import Header from '../Header'
import Navigation from '../Navigation'
import NxtWatchContext from '../../context/NxtWatchContext'

import {
  NotFoundContainer,
  NotFoundCard,
  LeftSection,
  RightSection,
  Image,
  Heading,
  Description,
} from './styledComponents'

const NotFound = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {darkMode} = value
      const backgroundColor = darkMode ? '#0f0f0f ' : '#f9f9f9'
      const textColor = darkMode ? '#ffffff' : '#000000'
      return (
        <NotFoundContainer bgColor={backgroundColor}>
          <Header />
          <NotFoundCard>
            <LeftSection bgColor={backgroundColor}>
              <Navigation />
            </LeftSection>
            <RightSection>
              <Image
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
                alt="not found"
              />
              <Heading color={textColor}>Page Not Found</Heading>
              <Description>
                We are sorry, the page you requested could not be found.
              </Description>
            </RightSection>
          </NotFoundCard>
        </NotFoundContainer>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default NotFound
