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
  width: 16px;
  height: 16px;
  margin-right: 8px;
`;

const StyledFavoriteIcon = styled(Favorite)`
  ${IconStyle};
`;

const StyledRetweetIcon = styled(Retweet)`
  ${IconStyle};
`;

const StyledReplyIcon = styled(Reply)`
  ${IconStyle};
`;

const Count = styled.span`
  display: block;
  font-weight: 300;
  font-size: 14px;
`;

const PillStyle = css`
  border: solid 1px;
  height: 24px;
  border-radius: 12px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RedPill = styled.div`
  ${PillStyle};
  border-color: #f06292;

  ${Count} {
    color: #f06292;
  }

  ${StyledFavoriteIcon} {
    color: #f06292;
  }

  &:hover {
    background: #f06292;
    cursor: pointer;

    ${Count} {
      color: #fff;
    }

    ${StyledFavoriteIcon} {
      color: #fff;
    }
  }
`;

const BluePill = styled.div`
  ${PillStyle};
  border-color: #408ecc;

  ${Count} {
    color: #408ecc;
  }

  ${StyledRetweetIcon} {
    color: #408ecc;
  }

  &:hover {
    background: #408ecc;
    cursor: pointer;

    ${Count} {
      color: #fff;
    }

    ${StyledRetweetIcon} {
      color: #fff;
    }
  }
`;

export const Style = styled.div`
  display: flex;
  align-items: center;

  ${RedPill} {
    margin-left: 8px;
  }
`;

export const TweetStatus: React.SFC<ITweetStatusProps> = (
  props: ITweetStatusProps
) => {
  return (
    <Style>
      <BluePill>
        <StyledRetweetIcon />
        <Count>{props.retweet_count}</Count>
      </BluePill>
      <RedPill>
        <StyledFavoriteIcon />
        <Count>{props.favorite_count}</Count>
      </RedPill>
    </Style>
  );
};
