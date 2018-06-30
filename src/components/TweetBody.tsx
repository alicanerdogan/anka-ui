import * as React from "react";
import styled from "react-emotion";
import { ITweet } from "../models/Tweet";
import { Avatar, Style as AvatarStyle } from "./Avatar";

export interface ITweetBodyProps {
  tweet: ITweet;
}

export const Style = styled.div`
  border: solid 1px #ccc;
  padding: 16px;
  display: flex;

  ${AvatarStyle} {
    margin-right: 12px;
  }
`;

const Text = styled.p`
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
      <Text>{tweet.text}</Text>
    </Style>
  );
};
