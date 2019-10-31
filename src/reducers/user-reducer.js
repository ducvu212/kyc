import _ from 'lodash';
import {
  SUCCESS,
  LOGIN,
  FACE_VERIFY,
  SAVE_CARD,
} from '../actions/action-types'

const initialState = {
  me: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${LOGIN}_${SUCCESS}`:
      // user
      const data = _.get(action, 'payload', null)
      const user = _.get(data, 'data', null)
      const token_collection = _.get(action, 'payload.token_collection', null)
      const userData = { ...user, token_collection }

      return {
        ...state,
        me: userData
      };
    case `${FACE_VERIFY}_${SUCCESS}`:
      const img_url = _.get(action, 'payload.img_url')
      return {
        ...state,
        me: {
          ...state.me,
          img_url
        }
      }
    case `${SAVE_CARD}_${SUCCESS}`:
      const payload = _.get(action, 'payload', null)
      return {
        ...state,
        card: payload
      }

    default:
      return state
  }
}

export default userReducer
