import Flex from "src/components/Flex"
import { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { lineCamp } from "src/styles/Styled"
import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useSWR from 'swr'
import baseFetcher from "src/fetcher";
import { createYoutubePlaylistsFromNet } from "src/features/pringpringcats/factories";

const Wrapper = styled(Flex)`
  margin: 0 -16px;
  &:after {
    content: '';
    display: block;
    flex: 1;
  }
`

const ItemWrapper = styled.div`
  width: calc(100%/3);
  margin-bottom: 20px;
  padding: 0 16px;

  @media screen and (max-width: ${({theme: {breakpoint}}) => breakpoint.md}) {
    width: calc(100%/2);
  }
  @media screen and (max-width: ${({theme: {breakpoint}}) => breakpoint.sm}) {
    width: 100%;
  }
`
const VideoInner = styled.a`
  transition: all .3s;
  display: block;
  color: inherit;
  border-radius: 16px 16px 0 0;
  text-decoration: none;
  
  &:hover {
    background-color: #222;
    border-color: #222;
  }
`
const ThumbnailWrapper = styled.div`
  border-radius: 16px;
  overflow: hidden;
  position: relative;
`
const Count = styled(Flex)`
  position: absolute;
  right: 8px;
  bottom: 8px;
  background: rgba(0, 0, 0, .7);
  padding: 2px 4px;
  font-size: 12px;
  border-radius: 4px;
  gap: 8px;
`
const VideoContent = styled.div`
  padding: 16px 8px;
`
const ListTitle = styled.h3<{ $lineCount?: number }>`
  ${lineCamp};
  margin: 0 0 8px;
`
const SubInfo = styled(Flex)`
  color: #aaa;
  font-size: 12px;
`

const PlaylistsSection = () => {
  const { data: rawData } = useSWR('/pringpringcats/playlists', baseFetcher, { revalidateIfStale: false })

  const lists = useMemo(() => {
    if(!rawData) { return []}
    return createYoutubePlaylistsFromNet(rawData.data)
  }, [rawData])

  return <Wrapper flexWrap="wrap" justifyContent="space-between">
    {lists.map(({
      id,
      thumbnails,
      title,
      videoCount,
      publishedAt
    }) => <ItemWrapper key={`videos-${id}`}>
      <VideoInner href={`https://www.youtube.com/playlist?list=${id}`} target="_blank">
        <ThumbnailWrapper>
          <img src={thumbnails.medium.url} alt={`videos-thumbnail-${title}`} />
          <Count alignItems="center">
            <FontAwesomeIcon icon={faList} />{videoCount} 部影片
          </Count>
        </ThumbnailWrapper>
        <VideoContent>
          <ListTitle $lineCount={2} title={title}>{title}</ListTitle>
          <SubInfo justifyContent="space-between">
            <span>創建時間：{publishedAt}</span>
          </SubInfo>
        </VideoContent>
      </VideoInner>
    </ItemWrapper>)}
  </Wrapper>
}

export default PlaylistsSection
