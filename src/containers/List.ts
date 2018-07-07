import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { IRootState } from "../reducers/reducer";
import { List, IListProps } from "../components/List/List";
import { getList } from "../actions/lists";
import { parseQueryString } from "../utils/url";
import { ITweet } from "../models/Tweet";

interface IStateProps {
  accessToken: string;
  listTimelines: { [key: string]: ITweet[] };
}

interface IDispatchProps {
  getList: (U: string, T: ITimelineExtendedQueryParams) => void;
}

type MergeProps = (
  T: IStateProps,
  Y: IDispatchProps,
  U: RouteComponentProps<any, any>
) => IListProps;

const mapStateToProps: (T: IRootState) => IStateProps = state => ({
  accessToken: state.accessToken,
  listTimelines: state.listTimelines
});

const mergeProps: MergeProps = (stateProps, dispatchProps, ownProps) => {
  const { accessToken, ...restStateProps } = stateProps;
  const token =
    accessToken || parseQueryString(ownProps.location.search).accessToken;
  const listId = ownProps.match.params.listId;
  return {
    ...ownProps,
    ...restStateProps,
    getList: (query: ITimelineQueryParams) =>
      dispatchProps.getList(listId, { accessToken: token, ...query }),
    tweets: stateProps.listTimelines && stateProps.listTimelines[listId]
  };
};

export default connect(
  mapStateToProps,
  { getList },
  mergeProps
)(List);
