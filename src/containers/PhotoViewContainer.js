import { connect } from 'react-redux'
import PhotoViewScreen from '../screens/PhotoViewScreen'

const mapStateToProps = state => {
  return {}
}

const PhotoViewContainer = connect(
  mapStateToProps,
  {}
)(PhotoViewScreen);

export default PhotoViewContainer
