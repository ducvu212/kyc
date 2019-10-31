import { combineReducers } from 'redux'
import { CLEAR_STATE, GET_STATE } from '../actions/action-types'
import appReducer from './app-reducer'
import authReducer from './auth-reducer'
import userReducer from './user-reducer'

const reducers = combineReducers({
  auth: authReducer,
  app: appReducer,
  user: userReducer,
})

const rootReducers = (state, action) => {
  console.log('================ REDUCERS ================', state, action)
  if (action.type === CLEAR_STATE) {
    state = {};
    return state
  }

  if (action.type === GET_STATE) {
    return state
  }

  return reducers(state, action);
};

export default rootReducers;
