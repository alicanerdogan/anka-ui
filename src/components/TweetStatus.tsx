import * as React from "react";
import styled, { css } from "react-emotion";

import { Favorite } from "../assets/Favorite.svg";
import { Reply } from "../assets/Reply.svg";
import { Retweet } from "../assets/Retweet.svg";

export interface ITweetStatusProps {
  retweet_count: number;
  favorite_count: number;
  favorited: boolean;
  retweeted: boolean;
}

const IconStyle = css`
  width: 20px;
  height: 20px;
  margin-right: 8px;
  color: #888;
`;

const StyledFavoriteIcon = styled(Favorite)`
  ${IconStyle};

  &:hover {
    stroke-width: 0;
    fill: #f06292;
  }
`;

const StyledRetweetIcon = styled(Retweet)`
  ${IconStyle};

  &:hover {
    stroke-width: 2;
    color: #408ecc;
  }
`;

const StyledReplyIcon = styled(Reply)`
  ${IconStyle};

  &:hover {
    stroke-width: 2;
    color: #408ecc;
  }
`;

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
      <StyledFavoriteIcon />
      <Count>{props.favorite_count}</Count>
      <StyledRetweetIcon />
      <Count>{props.retweet_count}</Count>
      <StyledReplyIcon />
    </Style>
  );
};
