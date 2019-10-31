import {
  LOGIN, SUCCESS,
} from '../actions/action-types'
import _ from 'lodash'

const initialState = {
  access_token: null,
  refresh_token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    
    default:
      return state
  }
}

export default authReducer
