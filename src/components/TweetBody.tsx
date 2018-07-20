import * as React from "react";
import styled from "react-emotion";
import { Link } from "react-router-dom";
import { ITweet } from "../models/Tweet";
import { Avatar, Style as AvatarStyle } from "./Avatar";
import { TweetText } from "./TweetText";
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
  onMediaClick?: (mediaItems: IMedia[], index: number) => void;
}

const QuotedTweetBodyStyle = styled.div`
  position: relative;
  padding: 12px;
  border: solid 1px #ccc;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
`;

export const Style = styled.div`
  display: flex;
  > * {
    flex: 0 0 auto;
  }

  > div {
    flex: 1;
  }

  ${AvatarStyle} {
    margin-right: 12px;
  }

  ${TweetStatusStyle} {
    margin-top: 12px;
  }

  ${MediaViewerStyle} {
    margin-top: 12px;
  }

  ${QuotedTweetBodyStyle} {
    margin-top: 12px;
  }
`;

const Text = styled.p`
  font-weight: 300;
  margin-bottom: 0;
`;

const Title = styled.div`
  margin-bottom: 4px;
`;

const Name = styled.span`
  font-weight: 400;
  margin-bottom: 0;
  margin-right: 6px;
`;

const Alias = styled(Link)`
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
  font-weight: 300;
  margin-bottom: 0;
  color: #aaa;
  text-decoration: none;
`;

export const TweetBody: React.SFC<ITweetBodyProps> = (
  props: ITweetBodyProps
) => {
  const { tweet, onMediaClick } = props;
  const mediaItems = tweet.extended_entities
    ? tweet.extended_entities.media
    : tweet.entities.media;
  return (
    <Style>
      <Avatar profileImageUrl={tweet.user.profile_image_url_https} />
      <div>
        <Title>
          <Name>{tweet.user.name}</Name>
          <Alias to={`/users/${tweet.user.id_str}`}>{`@${
            tweet.user.screen_name
          }`}</Alias>
          <TimeAgo to={`/tweets/${tweet.id_str}`}>
            {getTimeAgo(new Date(tweet.created_at))}
          </TimeAgo>
        </Title>
        <TweetText tweet={tweet} />
        {mediaItems && (
          <MediaViewer items={mediaItems} onMediaClick={onMediaClick} />
        )}
        {tweet.quoted_status && <QuotedTweetBody tweet={tweet.quoted_status} />}
        <TweetStatus {...tweet as ITweetStatusProps} />
      </div>
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
      <Title>
        <Name>{tweet.user.name}</Name>
        <Alias to={`/users/${tweet.user.id_str}`}>{`@${
          tweet.user.screen_name
        }`}</Alias>
        <TimeAgo to={`/tweets/${tweet.id_str}`}>
          {getTimeAgo(new Date(tweet.created_at))}
        </TimeAgo>
      </Title>
      <TweetText tweet={tweet} />
    </QuotedTweetBodyStyle>
  );
};
