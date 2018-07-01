import * as React from "react";
import styled from "react-emotion";
import { ITweet } from "../models/Tweet";
import { TweetBody, Style as TweetBodyStyle } from "./TweetBody";

export interface ITweetProps {
  tweet: ITweet;
}

interface ITweetState {}

export const Style = styled.div`
  border: solid 1px #ccc;
  border-top: none;

  ${TweetBodyStyle} {
    padding: 12px;
  }
`;

export const RTStatus = styled.span`
  background: #f0f0f0;
  color: #444;
  display: block;
  padding: 4px 0 4px 72px;
  margin-bottom: 4px;
`;

export class Tweet extends React.Component<ITweetProps, ITweetState> {
  constructor(props: ITweetProps) {
    super(props);

    this.state = {};
  }

  render() {
    const { tweet } = this.props;
    return (
      <Style>
        {tweet.retweeted_status && (
          <RTStatus>{`RT by @${tweet.user.screen_name}`}</RTStatus>
        )}
        <TweetBody tweet={tweet.retweeted_status || tweet} />
      </Style>
    );
  }
}
