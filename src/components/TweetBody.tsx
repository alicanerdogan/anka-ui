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

export interface ITweetBodyProps {
  tweet: ITweet;
}

export const Style = styled.div`
  border: solid 1px #ccc;
  padding: 12px;
  display: flex;

  ${AvatarStyle} {
    margin-right: 12px;
  }

  ${TweetStatusStyle} {
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
        </Title>
        <TweetText tweet={tweet} />
        <TweetStatus {...tweet as ITweetStatusProps} />
      </div>
    </Style>
  );
};
