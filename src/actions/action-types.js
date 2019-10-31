export const EMPTY = 'EMPTY';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';
export const CANCELED = 'CANCELED';
export const LOGIN = 'LOGIN';
export const FACE_VERIFY = 'FACE_VERIFY';
export const SAVE_CARD = 'SAVE_CARD';

// create action (using for request api)
export function createAction(type, data, success) {
  let suffix = ''
  if (success === true) {
    suffix = `_${SUCCESS}`
  } else if (success === false) {
    suffix = `_${ERROR}`
  } else if (success === CANCELED) {
    suffix = `_${CANCELED}`
  }

  const type_suffix = `${type}${suffix}`
  const action = (type, data) => ({
    type: type,
    payload: data
  })

  // dispatch
  return action(type_suffix, data)
}

// create action
export function dispatchAction(type, data, success) {

  const action = createAction(type, data, success)

  // dispatch action
  const { dispatchAction } = require('../store/index')
  dispatchAction(action)
}

