import { CHANGE_HUB } from '../../../data/hub/reducer'

export function changeHub(communityId) {
  return {
    type: CHANGE_HUB,
    payload: {
      communityId
    }
  }
}
