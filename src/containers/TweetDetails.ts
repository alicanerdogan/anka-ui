import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { IRootState } from "../reducers/reducer";
import { TweetDetails, ITweetDetailsProps } from "../components/TweetDetails";
import { getTweet } from "../actions/tweets";
import { ITweet } from "../models/Tweet";

interface IStateProps {
  tweet?: ITweet;
  accessToken: string;
}

interface IDispatchProps {
  getTweet: (tweetId: string, accessToken: string) => void;
}

type MergeProps = (
  T: IStateProps,
  Y: IDispatchProps,
  U: RouteComponentProps<any, any>
) => ITweetDetailsProps;

const mapStateToProps: (T: IRootState) => IStateProps = state => ({
  accessToken: state.accessToken,
  tweet: state.activeTweet
});

const mergeProps: MergeProps = (stateProps, dispatchProps, ownProps) => {
  const { accessToken, ...restStateProps } = stateProps;
  const tweetId = ownProps.match.params.id;
  return {
    ...ownProps,
    ...restStateProps,
    getTweet: () => dispatchProps.getTweet(tweetId, accessToken),
    tweetId
  };
};

export default connect(
  mapStateToProps,
  { getTweet },
  mergeProps
)(TweetDetails);
