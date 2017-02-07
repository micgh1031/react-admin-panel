'use strict'
import * as _ from 'lodash'
import Firebase from 'firebase'
import * as types from '../constants/index'
import { message } from 'antd'
import { sendEmail, sendSms } from './NotifyActions'
import { ref } from '../constants/firebase'

export function addRequest (id, request) {
  request.id = id
  return {
    type: types.ADD_BOOKING_REQUEST,
    param: request
  }
}

export function removeRequest (id) {
  return {
    type: types.REMOVE_BOOKING_REQUEST,
    id
  }
}

export function applyRequest (request, salon, res) {
  return function * (dispatch, getState) {
    try {
      const date = res.date
      const appliedRequest = _.assign({}, request)
      const state = getState()
      const user = state.users[appliedRequest.userId]

      if (user) {
        let pack
        let packId
        // find a pack with oldest processedAt
        for (let pId in user.curPacks) {
          if (user.curPacks[pId].curCount > 0 && (!pack || user.curPacks[pId].processedAt < pack.processedAt)) {
            pack = user.curPacks[pId]
            packId = pId
          }
        }

        if (pack) {
          const booking = {
            salonId: salon.id,
            booking: date.getTime(),
            appliedAt: Firebase.database.ServerValue.TIMESTAMP,
            packId: packId
          }

          appliedRequest.booking = booking
          yield ref.child('bookings').child(appliedRequest.id).set(appliedRequest)
          yield ref.child('users').child(appliedRequest.userId).child('curPacks').child(packId).child('bookings').child(request.id).set(booking)
          yield ref.child('users').child(appliedRequest.userId).child('curPacks').child(packId).child('curCount').set(pack.curCount - 1)
          yield ref.child('users').child(appliedRequest.userId).child('requests').child(request.id).set(null)
          yield ref.child('requests').child(appliedRequest.id).set(null)
          message.success('DONE!', 3)

          if (res.sendEmail) {
            sendEmail(user, date, salon)
          }

          if (res.sendSms) {
            sendSms(user, date, salon, request.id)
          }
        } else {
          // console.error('user',appliedRequest.userId, 'has no pack')
          message.error('Client has not pack', 3)
          // TODO raise error pack not exists
        }
      } else {
        console.error('user not eists', appliedRequest.userId)
        // TODO raise error user not exists
      }
    } catch (e) {
      console.error(e.stack)
    }
  }
}

export function undoRequest (booking) {
  return function * (dispatch, getState) {
    try {
      const state = getState()
      const request = _.assign({}, booking)
      _.unset(request, 'booking')

      const user = state.users[request.userId]
      const pack = user.curPacks[booking.booking.packId]

      yield ref.child('bookings').child(request.id).set(null)
      yield ref.child('requests').child(request.id).set(request)
      yield ref.child('users').child(request.userId).child('requests').child(request.id).set(request.dateCreate)
      yield ref.child('users').child(request.userId).child('curPacks').child(booking.booking.packId).child('bookings').child(request.id).set(null)
      yield ref.child('users').child(request.userId).child('curPacks').child(booking.booking.packId).child('curCount').set(pack.curCount + 1)

      message.success('DONE!', 3)
    } catch (e) {
      message.error('ERROR!!! Look at the console...')
      console.error(e.stack)
    }
  }
}

export function setNotified (booking) {
  return function * (dispatch, getState) {
    try {
      yield ref.child('bookings').child(booking.id).child('notified').set(Firebase.database.ServerValue.TIMESTAMP)
      message.success('DONE!', 3)
    } catch (e) {
      message.error('ERROR!!! Look at the console...')
      console.error(e.stack)
    }
  }
}
