import {formatDistanceToNow, parse} from 'date-fns'

import {AiOutlineClose} from 'react-icons/ai'

import NxtWatchContext from '../../context/NxtWatchContext'

import {
  LitsItemContainer,
  ClearButtonContainer,
  ClearButton,
  ListItem,
  CardImage,
  ChannelDetailsContainer,
  ChannelLogo,
  ChannelDetails,
  Title,
  ChannelName,
  ViewsAndDate,
  Dot,
  NavLink,
} from './styledComponents'

const SavedVideosItem = props => {
  const {savedVideoDetails, deleteVideo} = props

  const {
    id,
    channelName,
    channelProfileLogo,
    publishedDate,
    thumbnailUrl,
    title,
    viewsCount,
  } = savedVideoDetails

  const onDelete = () => {
    deleteVideo(id)
  }

  const formatDateString = dateString => {
    const date = parse(dateString, 'MMM dd, yyyy', new Date())
    const timeDifference = formatDistanceToNow(date, {addSuffix: true})
    return timeDifference
  }

  return (
    <NxtWatchContext>
      {value => {
        const {darkMode} = value
        const titleColor = darkMode ? '#ffffff' : '#000000'
        return (
          <LitsItemContainer>
            <ClearButtonContainer>
              <ClearButton onClick={onDelete}>
                <AiOutlineClose size={20} />
              </ClearButton>
            </ClearButtonContainer>
            <NavLink to={`/videos/${id}`}>
              <ListItem>
                <CardImage src={thumbnailUrl} alt="video thumbnail" />
                <ChannelDetailsContainer>
                  <ChannelLogo src={channelProfileLogo} alt="channel logo" />
                  <ChannelDetails>
                    <Title color={titleColor}>{title}</Title>
                    <ChannelName>{channelName}</ChannelName>

                    <ViewsAndDate>
                      {viewsCount} views <Dot> &#8226;</Dot>
                      {formatDateString(publishedDate)}
                    </ViewsAndDate>
                  </ChannelDetails>
                </ChannelDetailsContainer>
              </ListItem>
            </NavLink>
          </LitsItemContainer>
        )
      }}
    </NxtWatchContext>
  )
}
export default SavedVideosItem
