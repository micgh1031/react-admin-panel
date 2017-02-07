import * as types from '../constants/index'
import * as _ from 'lodash'

const initialState = {}

export default function usersReducer (state = initialState, action) {
  switch (action.type) {
    case types.ADD_USER:
      return {
        [action.user.id]: action.user,
        ...state
      }

    case types.UPDATE_USER:
      const new_user = action.user
      let newState = _.assign({}, state)
      _.set(newState, new_user.id, new_user)
      return newState

    case types.REMOVE_USER:
      newState = _.assign({}, state)
      _.unset(newState, action.userId)
      return newState

    default:
      return state
  }
}
