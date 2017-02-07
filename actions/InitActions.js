import { setModeReady } from './ModeActions'
import { addUser, updateUser, removeUser } from './UserActions'
import { addBooking, removeBooking } from './BookingActions'
import { addRequest, removeRequest } from './RequestActions'
import { addSalon, updateSalon } from './SalonActions'
import { addPack } from './PackActions'
import { ref, auth } from '../constants/firebase'

function * firebaseAuth () {
  console.log('firebaseAuth')
  yield auth.signInWithEmailAndPassword('admin@vurve.com', 'dfarr13$52#')
}

function * fetchRequests (dispatch) {
  console.log('fetch requests')
  try {
    ref.child('requests').on('child_added', function (snapshot, prevChildKey) {
      dispatch(addRequest(snapshot.key, snapshot.val()))
    })
    ref.child('requests').on('child_removed', function (snapshot) {
      dispatch(removeRequest(snapshot.key))
    })
  } catch (e) {
    console.error(e)
  }
}

function * fetchBookings (dispatch) {
  console.log('fetch bookings')
  try {
    ref.child('bookings').on('child_added', function (snapshot, prevChildKey) {
      dispatch(addBooking(snapshot.val()))
    })
    ref.child('bookings').on('child_changed', function (snapshot, prevChildKey) {
      dispatch(addBooking(snapshot.val()))
    })
    ref.child('bookings').on('child_removed', function (snapshot) {
      dispatch(removeBooking(snapshot.key))
    })
  } catch (e) {
    console.error(e)
  }
}

function * fetchSalons (dispatch) {
  console.log('fetch salons')
  try {
    ref.child('salons').on('child_added', function (snapshot, prevChildKey) {
      const salon = snapshot.val()
      salon.id = snapshot.key
      dispatch(addSalon(salon))
    })
    ref.child('salons').on('child_changed', function (snapshot, prevChildKey) {
      const salon = snapshot.val()
      salon.id = snapshot.key
      dispatch(updateSalon(salon))
    })
  } catch (e) {
    console.error(e)
  }
}

function * fetchUsers (dispatch) {
  console.log('fetch users')
  try {
    ref.child('users').on('child_added', function (snapshot, prevChildKey) {
      const user = snapshot.val()
      console.log('onChild added', user)
      user.id = snapshot.key
      dispatch(addUser(user))
    })
    ref.child('users').on('child_changed', function (snapshot, prevChildKey) {
      const user = snapshot.val()
      user.id = snapshot.key
      dispatch(updateUser(user))
    })
    ref.child('users').on('child_removed', function (snapshot) {
      const userId = snapshot.key
      dispatch(removeUser(userId))
    })
  } catch (e) {
    console.error(e)
  }
}

function * fetchPacks (dispatch) {
  console.log('fetch packs')
  try {
    ref.child('packs').on('child_added', function (snapshot, prevChildKey) {
      const pack = snapshot.val()
      pack.id = snapshot.key
      dispatch(addPack(pack))
    })
  } catch (e) {
    console.error(e)
  }
}

export function init () {
  return function * (dispatch, getState) {
    try {
      yield firebaseAuth()
      yield fetchUsers(dispatch)
      yield fetchRequests(dispatch)
      yield fetchBookings(dispatch)
      yield fetchSalons(dispatch)
      yield fetchPacks(dispatch)
      dispatch(setModeReady())
    } catch (e) {
      console.error(e.stack)
    }
  }
}
