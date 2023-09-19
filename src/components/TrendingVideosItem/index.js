import {formatDistanceToNow, parse} from 'date-fns'

import NxtWatchContext from '../../context/NxtWatchContext'

import {
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

const TrendingVideosItem = props => {
  const {trendingVideoDetails} = props

  const formatDateString = dateString => {
    const date = parse(dateString, 'MMM dd, yyyy', new Date())
    const timeDifference = formatDistanceToNow(date, {addSuffix: true})
    return timeDifference
  }

  const {
    id,
    channelName,
    channelProfileLogo,
    publishedDate,
    thumbnailUrl,
    title,
    viewsCount,
  } = trendingVideoDetails

  return (
    <NxtWatchContext>
      {value => {
        const {darkMode} = value
        const titleColor = darkMode ? '#ffffff' : '#000000'
        return (
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
        )
      }}
    </NxtWatchContext>
  )
}
export default TrendingVideosItem
