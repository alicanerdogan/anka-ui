import * as React from "react";
import styled from "react-emotion";
import { throttle, first, last } from "lodash-es";
import { Tweet, Style as TweetStyle } from "./Tweet";
import { RefreshTimeline } from "./RefreshTimeline";
import { VirtualizedList, IRowsRenderEvent } from "./VirtualizedList";
import { ITweet } from "../models/Tweet";
import { media } from "./../utils/styles";

export interface ITimelineProps {
  timeline?: any[];
  getTimeline: (query?: ITimelineQueryParams) => any;
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
    overflow-y: auto;
    overflow-x: hidden;
  }

  ${media.mobile`
    overflow-y: auto;
    overflow-x: hidden;
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
  throttledGetOldTimeline: (query: ITimelineQueryParams) => void;
  visibleRange?: { startIndex: number; stopIndex: number };

  constructor(props: ITimelineProps) {
    super(props);

    this.throttledGetOldTimeline = (() => {
      let activeRequest = false;
      return (...args: any[]) => {
        if (activeRequest) {
          return;
        }
        activeRequest = true;
        this.props
          .getTimeline(...args)
          .then(
            () =>
              new Promise(resolve => {
                setTimeout(() => resolve(), 6000);
              })
          )
          .then(() => (activeRequest = false));
      };
    })();
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
  }

  componentDidUpdate(oldProps: ITimelineProps) {
    const oldTimeline = oldProps.timeline;
    const timeline = this.props.timeline;

    if (!timeline || !oldTimeline) {
      return;
    }
  }

  onScroll = ({ startIndex, stopIndex }: IRowsRenderEvent): void => {
    if (
      this.visibleRange &&
      this.visibleRange.startIndex !== 0 &&
      startIndex === 0
    ) {
      const { onSeenAllNew } = this.props;
      onSeenAllNew && onSeenAllNew();
    }
    const { timeline } = this.props;
    if (timeline && timeline.length - stopIndex < 8) {
      this.throttledGetOldTimeline({ maxId: last<ITweet>(timeline).id_str });
    }
    this.visibleRange = { startIndex, stopIndex };
  };

  render(): JSX.Element {
    const { timeline, autoRefresh, getTimeline } = this.props;
    if (!timeline) {
      return null;
    }

    const firstTweet: ITweet = first<ITweet>(timeline);

    return (
      <Style>
        {autoRefresh && (
          <RefreshTimeline
            {...{
              getTimeline,
              sinceId: firstTweet && firstTweet.id_str
            }}
          />
        )}
        <VirtualizedList items={timeline} onRowsRendered={this.onScroll}>
          {({ item, style }) => (
            <div style={style}>
              <Tweet tweet={item} />
            </div>
          )}
        </VirtualizedList>
      </Style>
    );
  }
}
