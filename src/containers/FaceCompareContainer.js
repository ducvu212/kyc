import { connect } from 'react-redux';
import { faceCompare } from '../actions';
import FaceCompareScreen from '../screens/FaceCompareScreen'

const mapStateToProps = state => {
  const { user } = state
  return {
    user
  };
};

const FaceCompareContainer = connect(
  mapStateToProps,
  {
    faceCompare
  }
)(FaceCompareScreen);

export default FaceCompareContainer
