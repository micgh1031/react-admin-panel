import * as types from '../constants/index'
import { ref } from '../constants/firebase'

export function addPack (param) {
  return {
    type: types.ADD_PACK,
    param
  }
}

export function newPack (data) {
  return function * (dispatch, getState) {
    try {
      const pack = {
        count: data.count,
        price: data.price,
        price_per_one: data.price_per_one,
        expiryDays: data.expiryDays,
        isEnabled: false,
        savings: data.savings,
        valid: data.valid
      }
      yield ref.child('packs').push(pack)
    } catch (e) {
      console.error(e.stack)
    }
  }
}

export function enablePack (packId, isEnabled) {
  return function * (dispatch, getState) {
    try {
      yield ref.child('packs').child(packId).child('isEnabled').set(isEnabled)
    } catch (e) {
      console.error(e.stack)
    }
  }
}
