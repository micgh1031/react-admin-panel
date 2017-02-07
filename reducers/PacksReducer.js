import * as types from '../constants/index'

const initialState = {}

export default function packsReducer (state = initialState, action) {
  switch (action.type) {
    case types.ADD_PACK:
      const pack = action.param
      return {
        [pack.id]: pack,
        ...state
      }

    default:
      return state
  }
}
