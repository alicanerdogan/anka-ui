import * as React from "react";
import styled from "react-emotion";
import { ITweet } from "../models/Tweet";
import { TweetBody, Style as TweetBodyStyle } from "./TweetBody";
import { media } from "./../utils/styles";

export const TweetDetailsStyle = styled.div`
  position: relative;
  margin: 24px 16px;

  ${TweetBodyStyle} {
    padding: 24px;
    border-radius: 3px;
    background: white;
    box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
      0 5px 15px 0 rgba(0, 0, 0, 0.08);
  }

  ${media.mobile`
    border-radius: 0;
    box-shadow: none;
    border-left: solid 1px #eee;
    background: white;
    height: 100vh;
    margin: 0;

    ${TweetBodyStyle} {
      border-radius: 0;
      box-shadow: none;
      background: none;
    }
  `};
`;

export interface ITweetDetailsProps {
  tweetId: string;
  tweet?: ITweet;
  getTweet: () => void;
}

interface ITweetDetailsState {}

export class TweetDetails extends React.Component<
  ITweetDetailsProps,
  ITweetDetailsState
> {
  constructor(props: ITweetDetailsProps) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.getTweet();
  }

  componentDidUpdate(oldProps: ITweetDetailsProps) {
    if (this.props.tweetId !== oldProps.tweetId) {
      this.props.getTweet();
    }
  }

  render() {
    const { tweet } = this.props;

    if (!tweet) {
      return null;
    }

    return (
      <TweetDetailsStyle>
        <TweetBody tweet={tweet} />
      </TweetDetailsStyle>
    );
  }
}
