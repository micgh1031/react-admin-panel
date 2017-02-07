
import { combineReducers } from 'redux'
import mode from './Mode'
import requests from './BookingRequestReducer'
import users from './UsersReducer'
import salons from './SalonsReducer'
import bookings from './BookingsReducer'
import packs from './PacksReducer'

const rootReducer = combineReducers({
  mode,
  requests,
  users,
  salons,
  bookings,
  packs
})

export default rootReducer
