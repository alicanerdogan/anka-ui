import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { IRootState } from "../reducers/reducer";
import { User, IUserProps } from "../components/User/User";
import { getUser } from "../actions/user";
import { IUser } from "../models/User";

interface IStateProps {
  user?: IUser;
  accessToken: string;
}

interface IDispatchProps {
  getUser: (userId: string, accessToken: string) => void;
}

type MergeProps = (
  T: IStateProps,
  Y: IDispatchProps,
  U: RouteComponentProps<any, any>
) => IUserProps;

const mapStateToProps: (T: IRootState) => IStateProps = state => ({
  accessToken: state.accessToken,
  user: state.shownUser
});

const mergeProps: MergeProps = (stateProps, dispatchProps, ownProps) => {
  const { accessToken, ...restStateProps } = stateProps;
  const userId = ownProps.match.params.id;
  return {
    ...ownProps,
    ...restStateProps,
    getUser: () => dispatchProps.getUser(userId, accessToken)
  };
};

export default connect(
  mapStateToProps,
  { getUser },
  mergeProps
)(User);
