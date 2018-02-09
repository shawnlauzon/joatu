import { combineReducers } from 'redux'

import communities from './communities/reducer'
import users from './users/reducer'
import projects from './projects/reducer'
import authUser from './authUser/reducer'
import offers from './offers/reducer'
import requests from './requests/reducer'

export default combineReducers({
  authUser,
  communities,
  projects,
  users,
  offers,
  requests
})
