import { CHANGE_HUB } from './actions'

// hub: {
//   communityId: ...
// }

const reducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_HUB:
      return action.payload
    default:
      return state
  }
}

export default reducer
