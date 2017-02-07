import * as types from '../constants'

export function addBooking (param) {
  return {
    type: types.ADD_BOOKING,
    param
  }
}

export function removeBooking (id) {
  return {
    type: types.REMOVE_BOOKING,
    id
  }
}
