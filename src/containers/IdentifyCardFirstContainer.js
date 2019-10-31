import { connect } from 'react-redux';
import { detectId } from '../actions';
import IdentifyCardFirstScreen from '../screens/IdentifyCardFirstScreen'

const mapStateToProps = state => {
  const { user } = state
  return {
    user
  };
};

const IdentifyCardFirstContainer = connect(
  mapStateToProps,
  {
    detectId
  }
)(IdentifyCardFirstScreen);

export default IdentifyCardFirstContainer
