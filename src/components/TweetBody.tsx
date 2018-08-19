import * as React from "react";
import styled from "react-emotion";
import { Link } from "react-router-dom";
import { ITweet } from "../models/Tweet";
import { Avatar, Style as AvatarStyle } from "./Avatar";
import { TweetText, TweetTextStyle } from "./TweetText";
import {
  TweetStatus,
  ITweetStatusProps,
  Style as TweetStatusStyle
} from "./TweetStatus";
import { MediaViewer, Style as MediaViewerStyle } from "./MediaViewer";
import { WrapperLink } from "./List/WrapperLink";
import { getTimeAgo } from "../utils/date";
import { IMedia } from "../models/Entity";

export interface ITweetBodyProps {
  tweet: ITweet;
  rtBadge?: JSX.Element;
  onMediaClick?: (mediaItems: IMedia[], index: number) => void;
}

const Title = styled.div`
  font-size: 18px;
  margin-bottom: 4px;
`;

const Name = styled.span`
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 0;
  margin-right: 6px;
`;

const Alias = styled(Link)`
  font-size: 16px;
  font-weight: 300;
  margin-bottom: 0;
  margin-right: 12px;
  color: black;
  text-decoration: none;
  &:hover {
    text-decoration: none;
    font-weight: 400;
    color: blue;
  }
`;

const TimeAgo = styled(Link)`
  font-size: 16px;
  font-weight: 300;
  margin-bottom: 0;
  color: black;
  text-decoration: none;
`;

const QuotedTweetBodyStyle = styled.div`
  position: relative;
  padding: 12px;
  border-radius: 2px;
  background: #fff;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);

  ${TweetTextStyle} {
    margin-bottom: 0;
  }
`;

const TweetHeader = styled.div`
  display: flex;
  align-items: center;

  ${TweetStatusStyle} {
    margin-left: auto;
    margin-right: 12px;
  }
`;

export const Style = styled.div`
  ${AvatarStyle} {
    margin-right: 12px;
  }

  ${MediaViewerStyle} {
    margin-top: 12px;
  }

  ${QuotedTweetBodyStyle} {
    margin-top: 12px;
  }

  ${TweetTextStyle} {
    margin-top: 12px;
  }
`;

export const TweetBody: React.SFC<ITweetBodyProps> = (
  props: ITweetBodyProps
) => {
  const { tweet, onMediaClick, rtBadge } = props;
  const mediaItems = tweet.extended_entities
    ? tweet.extended_entities.media
    : tweet.entities.media;
  return (
    <Style>
      <TweetHeader>
        <Avatar profileImageUrl={tweet.user.profile_image_url_https} />
        <Name>{tweet.user.name}</Name>
        <Alias to={`/users/${tweet.user.screen_name}`}>{`@${
          tweet.user.screen_name
        }`}</Alias>
        {rtBadge}
        <TweetStatus {...tweet as ITweetStatusProps} />
        <TimeAgo to={`/tweets/${tweet.id_str}`}>
          {getTimeAgo(new Date(tweet.created_at))}
        </TimeAgo>
      </TweetHeader>
      <TweetText tweet={tweet} />
      {mediaItems && (
        <MediaViewer items={mediaItems} onMediaClick={onMediaClick} />
      )}
      {tweet.quoted_status && <QuotedTweetBody tweet={tweet.quoted_status} />}
    </Style>
  );
};

export const QuotedTweetBody: React.SFC<ITweetBodyProps> = (
  props: ITweetBodyProps
) => {
  const { tweet } = props;
  return (
    <QuotedTweetBodyStyle>
      <WrapperLink to={`/tweets/${tweet.id_str}`} />
      <TweetHeader>
        <Name>{tweet.user.name}</Name>
        <Alias to={`/users/${tweet.user.screen_name}`}>{`@${
          tweet.user.screen_name
        }`}</Alias>
        <TimeAgo to={`/tweets/${tweet.id_str}`}>
          {getTimeAgo(new Date(tweet.created_at))}
        </TimeAgo>
      </TweetHeader>
      <TweetText tweet={tweet} />
    </QuotedTweetBodyStyle>
  );
};
