import * as React from "react";
import styled from "react-emotion";
import { ITweet } from "../models/Tweet";
import { Avatar, Style as AvatarStyle } from "./Avatar";
import { TweetText } from "./TweetText";
import {
  TweetStatus,
  ITweetStatusProps,
  Style as TweetStatusStyle
} from "./TweetStatus";
import { MediaViewer, Style as MediaViewerStyle } from "./MediaViewer";
import { getTimeAgo } from "./../utils/date";

export interface ITweetBodyProps {
  tweet: ITweet;
}

const QuotedTweetBodyStyle = styled.div`
  padding: 12px;
  border: solid 1px #ccc;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
`;

export const Style = styled.div`
  display: flex;

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

const Alias = styled.span`
  font-weight: 300;
  margin-bottom: 0;
  margin-right: 12px;
`;

const TimeAgo = styled.span`
  font-weight: 300;
  margin-bottom: 0;
  color: #aaa;
`;

export const TweetBody: React.SFC<ITweetBodyProps> = (
  props: ITweetBodyProps
) => {
  const { tweet } = props;
  return (
    <Style>
      <Avatar profileImageUrl={tweet.user.profile_image_url_https} />
      <div>
        <Title>
          <Name>{tweet.user.name}</Name>
          <Alias>{`@${tweet.user.screen_name}`}</Alias>
          <TimeAgo>{getTimeAgo(new Date(tweet.created_at))}</TimeAgo>
        </Title>
        <TweetText tweet={tweet} />
        {tweet.entities.media && <MediaViewer items={tweet.entities.media} />}
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
      <Title>
        <Name>{tweet.user.name}</Name>
        <Alias>{`@${tweet.user.screen_name}`}</Alias>
        <TimeAgo>{getTimeAgo(new Date(tweet.created_at))}</TimeAgo>
      </Title>
      <TweetText tweet={tweet} />
    </QuotedTweetBodyStyle>
  );
};
