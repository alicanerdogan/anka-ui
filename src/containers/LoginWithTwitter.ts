import { connect } from "react-redux";
import { IRootState } from "./../reducers/reducer";
import { LoginWithTwitter } from "./../components/LoginWithTwitter";
import { getRequestToken } from "../actions/oauth";

const mapStateToProps: (T: IRootState) => { requestToken: string } = state => ({
  requestToken: state.requestToken
});

export default connect(
  mapStateToProps,
  { getRequestToken }
)(LoginWithTwitter);
