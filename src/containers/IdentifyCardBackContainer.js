import { connect } from 'react-redux';
import { detectId } from '../actions';
import IdentifyCardBackScreen from '../screens/IdentifyCardBackScreen'

const mapStateToProps = state => {
  const { user } = state
  return {
    user
  };
};

const IdentifyCardBackContainer = connect(
  mapStateToProps,
  {
    detectId
  }
)(IdentifyCardBackScreen);

export default IdentifyCardBackContainer
