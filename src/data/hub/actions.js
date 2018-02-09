export const CHANGE_HUB = 'CHANGE_HUB'

export function changeHub(communityId) {
  return {
    type: CHANGE_HUB,
    payload: {
      communityId
    }
  }
}
