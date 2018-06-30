import * as React from "react";
import { RouteComponentProps } from "react-router";
import styled from "react-emotion";
import { Tweet, Style as TweetStyle } from "./Tweet";

export interface ITimelineProps {
  timeline?: any[];
  getTimeline: () => any;
}

const Style = styled.div``;

export class Timeline extends React.Component<ITimelineProps, {}> {
  componentDidMount() {
    const { timeline, getTimeline } = this.props;
    !timeline && getTimeline();
  }

  render(): JSX.Element {
    const { timeline } = this.props;
    if (!timeline) {
      return null;
    }

    return (
      <Style>
        {timeline.map(tweet => <Tweet key={tweet.id} tweet={tweet} />)}
      </Style>
    );
  }
}
