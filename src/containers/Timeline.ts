import { connect } from "react-redux";
import { IRootState } from "../reducers/reducer";
import { Timeline, ITimelineProps } from "../components/Timeline";
import { getTimeline } from "../actions/tweets";
import { markAllAsRead } from "../actions/ui";
import { parseQueryString } from "../utils/url";

interface IStateProps {
  timeline: any[];
  accessToken: string;
}

interface IDispatchProps {
  getTimeline: (query: ITimelineExtendedQueryParams) => void;
  markAllAsRead: () => void;
  unseenTweetCount?: number;
}

type MergeProps = (T: IStateProps, Y: IDispatchProps, U: any) => ITimelineProps;

const mapStateToProps: (T: IRootState) => IStateProps = state => ({
  accessToken: state.accessToken,
  timeline: state.timeline,
  unseenTweetCount: state.unseenTweetCount
});

const mergeProps: MergeProps = (stateProps, dispatchProps, ownProps) => {
  const { accessToken, ...restStateProps } = stateProps;
  const token =
    accessToken || parseQueryString(ownProps.location.search).accessToken;
  return {
    ...restStateProps,
    getTimeline: (query: ITimelineQueryParams) =>
      dispatchProps.getTimeline({ accessToken: token, ...query }),
    onSeenAllNew: () => dispatchProps.markAllAsRead(),
    autoRefresh: true
  };
};

export default connect(
  mapStateToProps,
  { getTimeline, markAllAsRead },
  mergeProps
)(Timeline);
