import { connect } from "react-redux";
import { IRootState } from "../reducers/reducer";
import { Callback } from "../components/Callback";
import { getAccessToken } from "../actions/oauth";

const mapStateToProps: (T: IRootState) => { accessToken: string } = state => ({
  accessToken: state.accessToken
});

export default connect(
  mapStateToProps,
  { getAccessToken }
)(Callback);
