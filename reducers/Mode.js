import * as types from '../constants/index'

const initialState = types.MODE_INIT

export default function mode (state = initialState, action) {
  switch (action.type) {

    case types.SET_MODE_READY:
      return types.MODE_READY

    case types.SET_MODE_LOADING:
      return types.MODE_LOADING

    case types.SET_MODE_INIT:
      return types.MODE_INIT

    default:
      return state
  }
}
