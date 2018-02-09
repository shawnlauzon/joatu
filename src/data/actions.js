import * as communityActions from './communities/actions'
import * as projectActions from './projects/actions'
import * as userActions from './users/actions'
import * as authActions from './authUser/actions'
import * as offerActions from './offers/actions'
import * as requestActions from './requests/actions'

export {
  communityActions,
  projectActions,
  userActions,
  authActions,
  offerActions,
  requestActions
}

export const CALL_API = 'CALL_API'

export const ADD_PARTICIPANT_STARTED = 'ADD_PARTICIPANT_STARTED'
export const ADD_PARTICIPANT_SUCCEEDED = 'ADD_PARTICIPANT_SUCCEEDED'
export const ADD_PARTICIPANT_FAILED = 'ADD_PARTICIPANT_FAILED'

export function addParticipant(userId, projectId) {
  return {
    [CALL_API]: {
      types: [
        ADD_PARTICIPANT_STARTED,
        ADD_PARTICIPANT_SUCCEEDED,
        ADD_PARTICIPANT_FAILED
      ],
      action: 'addParticipant',
      userId,
      projectId
    }
  }
}
