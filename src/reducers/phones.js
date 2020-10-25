import * as R from 'ramda'

import {
  FETCH_PHONE_BY_ID_SUCCESS,
  FETCH_PHONES_SUCCESS,
  LOAD_MORE_PHONES_SUCCESS
} from '../actions/actionTypes'

const initialState = {}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_PHONES_SUCCESS:
      const newValues = R.indexBy(R.prop('id'), payload)
      return R.mergeRight(state, newValues)
    case LOAD_MORE_PHONES_SUCCESS:
      const moreValues = R.indexBy(R.prop('id'), payload)
      return R.mergeRight(state, moreValues)
    case FETCH_PHONE_BY_ID_SUCCESS:
      return R.assoc(payload.id, payload, state)
    default:
      return state
  }
}
