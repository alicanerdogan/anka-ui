import * as React from "react";
import styled from "react-emotion";
import { throttle, first, last } from "lodash-es";
import { Tweet, Style as TweetStyle } from "./Tweet";
import { RefreshTimeline } from "./RefreshTimeline";
import { ITweet } from "../models/Tweet";
import { media } from "./../utils/styles";

export interface ITimelineProps {
  timeline?: any[];
  getTimeline: (query?: ITimelineQueryParams) => void;
  autoRefresh?: boolean;
  onSeenAllNew?: () => void;
}

export const Style = styled.div`
  margin: 0 auto;
  max-width: 900px;
  overflow: hidden;
  border-radius: 3px;
  background: white;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);

  &:hover {
    overflow: auto;
  }

  ${media.mobile`
    overflow: auto;
    border-radius: 0;
    box-shadow: none;
    border-left: solid 1px #eee;
  `};
`;

interface IScrollStatus {
  scrollHeight: number;
  scrollTop: number;
  offsetHeight: number;
}

export class Timeline extends React.Component<ITimelineProps, {}> {
  onScrollRef: (ev: React.SyntheticEvent) => void;
  throttledGetOldTimeline: (query: ITimelineQueryParams) => void;
  element?: HTMLElement;
  scrollStatus?: IScrollStatus;

  constructor(props: ITimelineProps) {
    super(props);

    const throttledOnScroll = throttle(this.onScroll, 300);
    this.onScrollRef = (ev: React.SyntheticEvent) => {
      const element = ev.target as HTMLElement;
      throttledOnScroll({
        scrollHeight: element.scrollHeight,
        scrollTop: element.scrollTop,
        offsetHeight: element.offsetHeight
      });
    };
    this.throttledGetOldTimeline = throttle(this.props.getTimeline, 10000);
  }

  componentDidMount() {
    const { timeline, getTimeline } = this.props;
    !timeline && getTimeline();
  }

  componentWillReceiveProps(newProps: ITimelineProps) {
    const newTimeline = newProps.timeline;
    const timeline = this.props.timeline;

    if (!timeline || !newTimeline) {
      return;
    }

    if (
      first<ITweet>(newTimeline) !== first<ITweet>(timeline) &&
      this.element
    ) {
      this.scrollStatus = {
        scrollHeight: this.element.scrollHeight,
        scrollTop: this.element.scrollTop,
        offsetHeight: this.element.offsetHeight
      };
    }
  }

  componentDidUpdate(oldProps: ITimelineProps) {
    const oldTimeline = oldProps.timeline;
    const timeline = this.props.timeline;

    if (!timeline || !oldTimeline) {
      return;
    }

    if (
      first<ITweet>(oldTimeline) !== first<ITweet>(timeline) &&
      this.element
    ) {
      window.requestAnimationFrame(() => {
        const restoredScrollPosition =
          this.scrollStatus.scrollTop +
          this.element.scrollHeight -
          this.scrollStatus.scrollHeight;
        this.element.scrollTop = restoredScrollPosition;
      });
    }
  }

  onScroll = ({
    scrollHeight,
    scrollTop,
    offsetHeight
  }: IScrollStatus): void => {
    if (scrollTop === 0) {
      const { onSeenAllNew } = this.props;
      onSeenAllNew && onSeenAllNew();
    }
    if (scrollHeight - scrollTop <= offsetHeight + 500) {
      const { timeline } = this.props;
      this.throttledGetOldTimeline({ maxId: last<ITweet>(timeline).id_str });
    }
  };

  render(): JSX.Element {
    const { timeline, autoRefresh, getTimeline } = this.props;
    if (!timeline) {
      return null;
    }

    const firstTweet: ITweet = first<ITweet>(timeline);

    return (
      <Style onScroll={this.onScrollRef} innerRef={el => (this.element = el)}>
        {autoRefresh && (
          <RefreshTimeline
            {...{
              getTimeline,
              sinceId: firstTweet && firstTweet.id_str
            }}
          />
        )}
        {timeline.map(tweet => <Tweet key={tweet.id_str} tweet={tweet} />)}
      </Style>
    );
  }
}
