import * as React from "react";
import styled from "react-emotion";
import { ITweet } from "../models/Tweet";
import { TweetBody, Style as TweetBodyStyle } from "./TweetBody";
import { RTBadge, RTBadgeStyle } from "./RTBadge";
import { IMedia } from "../models/Entity";

export interface ITweetProps {
  tweet: ITweet;
  onMediaClick?: (mediaItems: IMedia[], index: number) => void;
}

interface IStyleProps {
  retweet?: boolean;
}

export const Style = styled.div`
  border-bottom: solid 1px #eee;
  background: ${(props: IStyleProps) => (props.retweet ? "#f8f0f8" : "#fff")};

  ${RTBadgeStyle} {
    margin: 8px 0 0px 12px;
  }

  ${TweetBodyStyle} {
    padding: 12px;
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
        {retweet && <RTBadge alias={tweet.user.screen_name} />}
        <TweetBody
          tweet={tweet.retweeted_status || tweet}
          onMediaClick={onMediaClick}
        />
      </Style>
    );
  }
}
