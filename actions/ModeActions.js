import * as types from '../constants/index'

export function setModeLoading () {
  return {
    type: types.SET_MODE_LOADING
  }
}

export function setModeReady () {
  return {
    type: types.SET_MODE_READY
  }
}
