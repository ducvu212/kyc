import { connect } from 'react-redux';
import { } from '../actions';
import LaunchScreen from '../screens/LaunchScreen'

const mapStateToProps = state => {
  const { user } = state
  return {
    user
  };
};

const LaunchContainer = connect(
  mapStateToProps,
  {

  }
)(LaunchScreen);

export default LaunchContainer
