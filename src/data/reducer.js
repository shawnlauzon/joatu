import { combineReducers } from 'redux'

import communities from './communities/reducer'
import users from './users/reducer'
import projects from './projects/reducer'
import authenticated from './authenticated/reducer'
import offers from './offers/reducer'
import requests from './offers/reducer'

export default combineReducers({
  authenticated,
  communities,
  projects,
  users,
  offers,
  requests
})
