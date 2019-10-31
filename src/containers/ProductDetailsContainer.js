import { connect } from 'react-redux';
import { getAllProduct } from '../actions';
import ProductDetailsScreen from '../screens/ProductDetailsScreen'

const mapStateToProps = state => {
    const { user } = state
    return {
        user
    };
};

const ProductDetailsContainer = connect(
    mapStateToProps,
    {
        getAllProduct
    }
)(ProductDetailsScreen);

export default ProductDetailsContainer
