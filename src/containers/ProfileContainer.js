import { connect } from 'react-redux';
import { } from '../actions';
import ProfileScreen from '../screens/ProfileScreen'

const mapStateToProps = state => {
  const { user } = state
  return {
    user
  };
};

const ProfileContainer = connect(
  mapStateToProps,
  {

  }
)(ProfileScreen);

export default ProfileContainer
