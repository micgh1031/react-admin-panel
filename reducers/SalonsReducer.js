import * as types from '../constants/index'
import * as _ from 'lodash'

const initialState = {}

export default function salonsReducer (state = initialState, action) {
  switch (action.type) {

    case types.ADD_SALON:
      const salon = action.param
      return {
        [salon.id]: salon,
        ...state
      }

    case types.UPDATE_SALON:
      const new_salon = action.param
      const newState = _.assign({}, state)
      _.set(newState, new_salon.id, new_salon)
      return newState

    default:
      return state
  }
}
