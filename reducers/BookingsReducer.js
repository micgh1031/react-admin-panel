import * as types from '../constants/index'
import * as _ from 'lodash'

const initialState = {}

export default function receiveBookings (state = initialState, action) {
  switch (action.type) {
    case types.ADD_BOOKING:
      const booking = action.param
      return {
        ...state,
        [booking.id]: booking
      }

    case types.REMOVE_BOOKING:
      const newState = _.assign({}, state)
      _.unset(newState, action.id)
      return newState

    default:
      return state
  }
}
