import * as React from "react";
import styled from "react-emotion";
import { ITweet } from "../models/Tweet";
import { TweetBody, Style as TweetBodyStyle } from "./TweetBody";
import { IMedia } from "../models/Entity";
import { RTBadge, RTBadgeStyle } from "./RTBadge";

export interface ITweetProps {
  tweet: ITweet;
  onMediaClick?: (mediaItems: IMedia[], index: number) => void;
}

interface IStyleProps {
  retweet?: boolean;
}

export const Style = styled.div`
  position: relative;
  border-bottom: solid 1px #e5e5e5;
  border-top-style: solid;
  border-top-color: ${(props: IStyleProps) =>
    props.retweet ? "#3f8ecc" : "#e5e5e5"};
  border-top-width: ${(props: IStyleProps) => (props.retweet ? "6px" : "0")};

  ${TweetBodyStyle} {
    padding: 12px;
  }

  ${RTBadgeStyle} {
    margin-right: 12px;
  }
`;

export class Tweet extends React.PureComponent<ITweetProps, {}> {
  constructor(props: ITweetProps) {
    super(props);

    this.state = {};
  }

  render() {
    const { tweet, onMediaClick } = this.props;
    const retweet: boolean = !!tweet.retweeted_status;
    return (
      <Style retweet={retweet}>
        <TweetBody
          tweet={tweet.retweeted_status || tweet}
          rtBadge={retweet ? <RTBadge alias={tweet.user.screen_name} /> : null}
          onMediaClick={onMediaClick}
        />
      </Style>
    );
  }
}
