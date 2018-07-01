import { connect } from "react-redux";
import { IRootState } from "./../reducers/reducer";
import { Timeline } from "./../components/Timeline";
import { getTimeline, getNewTimeline, getOldTimeline } from "../actions/tweets";
import { parseQueryString } from "../utils/url";

interface IStateProps {
  timeline: any[];
  accessToken: string;
}

interface IDispatchProps {
  getTimeline: (T: string) => void;
  getNewTimeline: (T: string, U: string) => void;
  getOldTimeline: (T: string, U: string) => void;
}

interface IProps {
  timeline: any[];
  getTimeline: (T: string) => void;
}

type MergeProps = (T: IStateProps, Y: IDispatchProps, U: any) => IProps;

const mapStateToProps: (T: IRootState) => IStateProps = state => ({
  accessToken: state.accessToken,
  timeline: state.timeline
});

const mergeProps: MergeProps = (stateProps, dispatchProps, ownProps) => {
  const { accessToken, ...restStateProps } = stateProps;
  const token =
    accessToken || parseQueryString(ownProps.location.search).accessToken;
  return {
    ...restStateProps,
    getTimeline: () => dispatchProps.getTimeline(token),
    getNewTimeline: (sinceId: string) =>
      dispatchProps.getNewTimeline(token, sinceId),
    getOldTimeline: (maxId: string) =>
      dispatchProps.getOldTimeline(token, maxId),
    autoRefresh: true
  };
};

export default connect(
  mapStateToProps,
  { getTimeline, getNewTimeline, getOldTimeline },
  mergeProps
)(Timeline);
