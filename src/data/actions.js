import * as communityActions from './community/actions'
import * as projectActions from './project/actions'
import * as userActions from './user/actions'
import * as authActions from './authUser/actions'
import * as offerActions from './offer/actions'
import * as requestActions from './request/actions'
import * as commentActions from './comments/actions'
import * as chatActions from './chats/actions'

export const CALL_API = 'CALL_API'

export const CHANGE_HUB = 'CHANGE_HUB'

function changeHub(communityId) {
  return {
    type: CHANGE_HUB,
    payload: {
      communityId
    }
  }
}

export {
  communityActions,
  projectActions,
  userActions,
  authActions,
  offerActions,
  requestActions,
  commentActions,
  chatActions,
  changeHub
}
