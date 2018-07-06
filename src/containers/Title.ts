import { connect } from "react-redux";
import { IRootState } from "../reducers/reducer";
import { Title, ITitleProps } from "../components/Title";

const mapStateToProps: (T: IRootState) => ITitleProps = ({
  unseenTweetCount
}) => ({
  baseTitle: "Anka",
  postTitle: unseenTweetCount > 0 ? `(${unseenTweetCount})` : null
});

export default connect(mapStateToProps)(Title);
