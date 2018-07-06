import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { IRootState } from "../reducers/reducer";
import { Likes, ILikesProps } from "../components/Likes";
import { getLikes } from "../actions/tweets";
import { parseQueryString } from "../utils/url";
import { ITweet } from "../models/Tweet";

interface IStateProps {
  likes?: ITweet[];
  accessToken: string;
}

interface IDispatchProps {
  getLikes: (T: ITimelineExtendedQueryParams) => void;
}

type MergeProps = (
  T: IStateProps,
  Y: IDispatchProps,
  U: RouteComponentProps<any, any>
) => ILikesProps;

const mapStateToProps: (T: IRootState) => IStateProps = state => ({
  accessToken: state.accessToken,
  likes: state.likes
});

const mergeProps: MergeProps = (stateProps, dispatchProps, ownProps) => {
  const { accessToken, ...restStateProps } = stateProps;
  const token =
    accessToken || parseQueryString(ownProps.location.search).accessToken;
  return {
    ...ownProps,
    ...restStateProps,
    getLikes: (query: ITimelineQueryParams) =>
      dispatchProps.getLikes({ accessToken: token, ...query })
  };
};

export default connect(
  mapStateToProps,
  { getLikes },
  mergeProps
)(Likes);
