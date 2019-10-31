import { connect } from 'react-redux';
import { saveCard } from '../actions';
import ConfirmInformationScreen from '../screens/ConfirmInformationScreen'

const mapStateToProps = state => {
  const { user } = state
  return {
    user
  };
};

const ConfirmInformationContainer = connect(
  mapStateToProps,
  {
    saveCard
  }
)(ConfirmInformationScreen);

export default ConfirmInformationContainer
