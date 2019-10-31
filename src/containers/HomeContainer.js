import { connect } from 'react-redux';
import { getAllProduct } from '../actions';
import HomeScreen from '../screens/HomeScreen'

const mapStateToProps = state => {
  const { user } = state
  return {
    user
  };
};

const HomeContainer = connect(
  mapStateToProps,
  {
    getAllProduct
  }
)(HomeScreen);

export default HomeContainer
