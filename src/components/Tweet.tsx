import * as React from "react";
import styled from "react-emotion";
import { ITweet } from "../models/Tweet";
import { TweetBody, Style as TweetBodyStyle } from "./TweetBody";
import { RTBadge, RTBadgeStyle } from "./RTBadge";

export interface ITweetProps {
  tweet: ITweet;
}

export const Style = styled.div`
  border-bottom: solid 1px #eee;

  ${RTBadgeStyle} {
    margin: 8px 0 0px 12px;
  }

  ${TweetBodyStyle} {
    padding: 12px;
  }
`;

export class Tweet extends React.Component<ITweetProps, {}> {
  constructor(props: ITweetProps) {
    super(props);

    this.state = {};
  }

  render() {
    const { tweet } = this.props;
    return (
      <Style>
        {tweet.retweeted_status && <RTBadge alias={tweet.user.screen_name} />}
        <TweetBody tweet={tweet.retweeted_status || tweet} />
      </Style>
    );
  }
}
