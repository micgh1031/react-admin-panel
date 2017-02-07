import * as types from '../constants/index'
import * as _ from 'lodash'

const initialState = {}

export default function bookingRequests (state = initialState, action) {
  switch (action.type) {
    case types.ADD_BOOKING_REQUEST:
      const request = action.param
      return {
        [request.id]: request,
        ...state
      }

    case types.REMOVE_BOOKING_REQUEST:
      const newState = _.assign({}, state)
      _.unset(newState, action.id)
      return newState

    default:
      return state
  }
}
