import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { IRootState } from "../reducers/reducer";
import { Lists, IListsProps } from "../components/List/Lists";
import { getLists } from "../actions/lists";
import { parseQueryString } from "../utils/url";
import { IList } from "../models/List";

interface IStateProps {
  lists?: IList[];
  accessToken: string;
}

interface IDispatchProps {
  getLists: (accessToken: string) => void;
}

type MergeProps = (
  T: IStateProps,
  Y: IDispatchProps,
  U: RouteComponentProps<any, any>
) => IListsProps;

const mapStateToProps: (T: IRootState) => IStateProps = state => ({
  accessToken: state.accessToken,
  lists: state.lists
});

const mergeProps: MergeProps = (stateProps, dispatchProps, ownProps) => {
  const { accessToken, ...restStateProps } = stateProps;
  const token: string =
    accessToken || parseQueryString(ownProps.location.search).accessToken;
  return {
    ...ownProps,
    ...restStateProps,
    getLists: () => dispatchProps.getLists(token)
  };
};

export default connect(
  mapStateToProps,
  { getLists },
  mergeProps
)(Lists);
