import { connect } from "react-redux";
import { IRootState } from "../reducers/reducer";
import { Notification, INotificationProps } from "../components/Notification";
import { markAllAsRead } from "../actions/ui";

interface IStateProps {
  tweetCount: number;
}

interface IDispatchProps {
  markAllAsRead: () => void;
}

type MergeProps = (
  T: IStateProps,
  U: IDispatchProps,
  V: INotificationProps
) => INotificationProps;

const mapStateToProps: (T: IRootState) => IStateProps = state => ({
  tweetCount: state.unseenTweetCount
});

const mergeProps: MergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...stateProps,
    ...ownProps,
    onDismiss: () => dispatchProps.markAllAsRead()
  };
};

export default connect(
  mapStateToProps,
  { markAllAsRead },
  mergeProps
)(Notification);
