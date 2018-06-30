import * as React from "react";
import styled from "react-emotion";
import { ITweet } from "../models/Tweet";
import { TweetBody } from "./TweetBody";

export interface ITweetProps {
  tweet: ITweet;
}

interface ITweetState {}

export const Style = styled.div``;

export class Tweet extends React.Component<ITweetProps, ITweetState> {
  constructor(props: ITweetProps) {
    super(props);

    this.state = {};
  }

  render() {
    const { tweet } = this.props;
    return (
      <Style>
        <TweetBody tweet={tweet.retweeted_status || tweet} />
      </Style>
    );
  }
}
