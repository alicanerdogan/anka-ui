import * as React from "react";
import styled from "react-emotion";
import { ITweet } from "../models/Tweet";
import { Tweet, Style as TweetStyle } from "./Tweet";

export interface IRepliesProps {
  replies?: ITweet[];
  getReplies: () => void;
}

interface IRepliesState {}

export const RepliesStyle = styled.div``;

export class Replies extends React.Component<IRepliesProps, IRepliesState> {
  constructor(props: IRepliesProps) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.getReplies();
  }

  render() {
    const { replies } = this.props;

    if (!replies) {
      return null;
    }

    return (
      <RepliesStyle>
        {replies.map(tweet => <Tweet key={tweet.id_str} tweet={tweet} />)}
      </RepliesStyle>
    );
  }
}
