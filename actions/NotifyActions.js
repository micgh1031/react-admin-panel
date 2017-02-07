import * as _ from 'lodash'
import { message } from 'antd'
import { ref } from '../constants/firebase'

export function sendSms (user, date, salon, requestId) {
  if (_.has(user, 'phone')) {
    // const message = `Dear ${user.name}, you booked a visit at ${new Date(date).toLocaleString('en-US')} to the ${salon.name} at the address ${salon.address}`
    const message = `You booked a visit at ${new Date(date).toLocaleString('en-US')} to the ${salon.name}, ${salon.address}`
    const sms = {
      requestId,
      userId: user.id,
      to: user.phone,
      createdAt: _.now(),
      message
    }
    ref.child('sms').push(sms)
  }
}

export function sendTestSms (sms) {
  return function * (dispatch, getState) {
    try {
      ref.child('sms').push(sms)
      message.success(`Sms was sent to ${sms.to}!`, 3)
    } catch (e) {
      message.error('ERROR!!! Look at the console...')
      console.error(e.stack)
    }
  }
}

export function sendEmail (user, date, salon) {
  const mail = {
    email: user.email,
    userName: user.name,
    bookingDate: new Date(date).toLocaleString('en-US'),
    salonName: salon.name,
    address: salon.address
  }
  ref.child('mails').push(mail)
}

export function sendTestEmail (mail) {
  return function * (dispatch, getState) {
    try {
      ref.child('mails').push(mail)
      message.success(`Email was sent to ${mail.email}!`, 3)
    } catch (e) {
      message.error('ERROR!!! Look at the console...')
      console.error(e.stack)
    }
  }
}
