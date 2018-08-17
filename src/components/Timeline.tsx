import * as React from "react";
import styled from "react-emotion";
import { throttle, first, last } from "lodash-es";
import { Tweet, Style as TweetStyle } from "./Tweet";
import { RefreshTimeline } from "./RefreshTimeline";
import { VirtualizedList } from "./VirtualizedList";
import { MediaModal } from "./MediaModal";
import { ITweet } from "../models/Tweet";
import { media } from "./../utils/styles";
import { IMedia } from "../models/Entity";
import { Spinner } from "./Spinner";
import { IRenderRange } from "./VirtualizedList/VirtualizedList";

export const Style = styled.div`
  margin: 0 auto;
  max-width: 900px;
  border-radius: 3px;
  background: white;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);

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

export interface ITimelineProps {
  timeline?: any[];
  getTimeline: (query?: ITimelineQueryParams) => any;
  autoRefresh?: boolean;
  onSeenAllNew?: () => void;
  unseenTweetCount?: number;
}

interface ITimelineState {
  isModalOpen: boolean;
  selectedImageIndex?: number;
  selectedMediaItems?: IMedia[];
  scrollToIndex?: number;
}

export class Timeline extends React.Component<ITimelineProps, ITimelineState> {
  static getItemId(tweet: ITweet): string {
    return tweet.id_str;
  }

  throttledGetOldTimeline: (query: ITimelineQueryParams) => void;
  visibleRange?: { startIndex: number; stopIndex: number };

  constructor(props: ITimelineProps) {
    super(props);

    this.state = { isModalOpen: false };

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
    const newUnseenTweetCount = newProps.unseenTweetCount;
    const unseenTweetCount = this.props.unseenTweetCount;

    if (!newUnseenTweetCount) {
      return;
    }

    if (unseenTweetCount !== newUnseenTweetCount) {
      const scrollToIndex =
        (this.visibleRange ? this.visibleRange.startIndex : 0) +
        (newUnseenTweetCount - (unseenTweetCount || 0));
      this.setState(state => ({
        ...state,
        scrollToIndex
      }));
    }
  }

  onCloseModalRequest = () =>
    this.setState(state => ({ ...state, isModalOpen: false }));

  onMediaClick = (items: IMedia[], index: number) =>
    this.setState(state => ({
      ...state,
      isModalOpen: true,
      selectedImageIndex: index,
      selectedMediaItems: items
    }));

  onScroll = ({ firstVisibleItemIndex, lastVisibleItemIndex }: IRenderRange): void => {
    if (
      this.visibleRange &&
      this.visibleRange.startIndex !== 0 &&
      firstVisibleItemIndex === 0
    ) {
      const { onSeenAllNew } = this.props;
      onSeenAllNew && onSeenAllNew();
    }
    const { timeline } = this.props;
    if (timeline && timeline.length - lastVisibleItemIndex < 8) {
      this.throttledGetOldTimeline({ maxId: last<ITweet>(timeline).id_str });
    }
    this.visibleRange = { startIndex: firstVisibleItemIndex, stopIndex: lastVisibleItemIndex };
  };

  render(): JSX.Element {
    const { timeline, autoRefresh, getTimeline } = this.props;

    const firstTweet: ITweet = first<ITweet>(timeline);

    const {
      isModalOpen,
      selectedMediaItems,
      selectedImageIndex,
      scrollToIndex
    } = this.state;

    return (
      <Style>
        <Spinner ready={!!timeline}>
          {() =>
            <React.Fragment>
              {autoRefresh && (
                <RefreshTimeline
                  {...{
                    getTimeline,
                    sinceId: firstTweet && firstTweet.id_str
                  }}
                />
              )}
              <MediaModal
                items={selectedMediaItems}
                isOpen={isModalOpen}
                onCloseRequest={this.onCloseModalRequest}
                initialIndex={selectedImageIndex}
              />
              <VirtualizedList
                items={timeline}
                onRenderRangeChange={this.onScroll}
                getItemId={Timeline.getItemId}
                scrollToIndex={scrollToIndex}
                scrollToAlignment="start"
              >
                {({ item, style }) => (
                  <div style={style}>
                    <Tweet tweet={item} onMediaClick={this.onMediaClick} />
                  </div>
                )}
              </VirtualizedList>
            </React.Fragment>}
        </Spinner>
      </Style>
    );
  }
}
