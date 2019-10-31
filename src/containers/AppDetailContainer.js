import { connect } from 'react-redux';
import { getAllApp } from '../actions';
import ApplicationDetailsScreen from '../screens/ApplicationDetailsScreen'

const mapStateToProps = state => {
  const { user } = state
  return {
    user
  };
};

const ApplicationDetailsContainer = connect(
  mapStateToProps,
  {
    getAllApp
  }
)(ApplicationDetailsScreen);

export default ApplicationDetailsContainer
