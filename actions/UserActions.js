import * as types from '../constants/index'
import { ref } from '../constants/firebase'

export function addUser (user) {
  return {
    type: types.ADD_USER,
    user
  }
}

export function updateUser (user) {
  return {
    type: types.UPDATE_USER,
    user
  }
}

export function removeUser (userId) {
  return {
    type: types.REMOVE_USER,
    userId
  }
}

export function fetchUser (userId) {
  return function * (dispatch, getState) {
    try {
      const snapshot = yield ref.child('users').child(userId).once('value')
      const user = snapshot.val()
      if (user) {
        dispatch(addUser(user))
      } else {
        console.log('user ', userId, 'is not exist in db')
      }
    } catch (e) {
      console.error(e.stack)
    }
  }
}

export function makeCharge (data) {
  return function * (dispatch, getState) {
    try {
      const userId = '4052d444-b6f3-4e1c-8b84-5f0bfde110b0'
      const packId = '-KGjnm9pW4yZtGCL416k'
      const charge = {
        userId,
        packId,
        data
      }
      yield ref.child('charges').push(charge)
    } catch (e) {
      console.error(e.stack)
    }
  }
}
