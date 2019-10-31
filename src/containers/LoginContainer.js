import { connect } from 'react-redux';
import { login } from '../actions';
import LoginScreen from '../screens/LoginScreen'

const mapStateToProps = state => {
  const { user } = state
  return {
    user
  };
};

const LoginContainer = connect(
  mapStateToProps,
  {
    login
  }
)(LoginScreen);

export default LoginContainer
