import * as React from "react";
import styled from "react-emotion";
import { ITweet } from "../models/Tweet";
import { TweetBody, Style as TweetBodyStyle } from "./TweetBody";
import { RTBadge, RTBadgeStyle } from "./RTBadge";

export interface ITweetProps {
  tweet: ITweet;
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

export class Tweet extends React.Component<ITweetProps, {}> {
  constructor(props: ITweetProps) {
    super(props);

    this.state = {};
  }

  render() {
    const { tweet } = this.props;
    const retweet: boolean = !!tweet.retweeted_status;
    return (
      <Style retweet={retweet}>
        {retweet && <RTBadge alias={tweet.user.screen_name} />}
        <TweetBody tweet={tweet.retweeted_status || tweet} />
      </Style>
    );
  }
}
