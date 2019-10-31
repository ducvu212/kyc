import { connect } from 'react-redux';
import { getAllApp } from '../actions';
import ApplicationScreen from '../screens/ApplicationScreen'

const mapStateToProps = state => {
  const { user } = state
  return {
    user
  };
};

const ApplicationContainer = connect(
  mapStateToProps,
  {
    getAllApp
  }
)(ApplicationScreen);

export default ApplicationContainer
