import NxtWatchContext from '../../context/NxtWatchContext'

import {
  ListItem,
  CardImage,
  GameDetailsContainer,
  Title,
  Views,
  NavLink,
} from './styledComponents'

const GamingVideosItem = props => (
  <NxtWatchContext.Consumer>
    {value => {
      const {darkMode} = value
      const {gamingVidoeDetails} = props
      const {id, thumbnailUrl, title, viewsCount} = gamingVidoeDetails
      const titleColor = darkMode ? '#ffffff' : '#000000'

      return (
        <NavLink to={`videos/${id}`}>
          <ListItem>
            <CardImage src={thumbnailUrl} alt="video thumbnail" />
            <GameDetailsContainer>
              <Title color={titleColor}>{title}</Title>
              <Views>{viewsCount} Watching WorldWide</Views>
            </GameDetailsContainer>
          </ListItem>
        </NavLink>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default GamingVideosItem
