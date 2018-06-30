import * as React from "react";
import styled from "react-emotion";

import retweet from "./../assets/retweet.svg";
import reply from "./../assets/reply.svg";
import favorite from "./../assets/favorite.svg";

export interface ITweetStatusProps {
  retweet_count: number;
  favorite_count: number;
  favorited: boolean;
  retweeted: boolean;
}

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

const Count = styled.span`
  display: block;
`;

export const Style = styled.div`
  display: flex;
  align-items: center;

  ${Icon} {
    margin-right: 8px;
  }

  ${Count} {
    margin-right: 48px;
  }
`;

export const TweetStatus: React.SFC<ITweetStatusProps> = (
  props: ITweetStatusProps
) => {
  return (
    <Style>
      <Icon src={favorite} />
      <Count>{props.favorite_count}</Count>
      <Icon src={retweet} />
      <Count>{props.retweet_count}</Count>
      <Icon src={reply} />
    </Style>
  );
};
