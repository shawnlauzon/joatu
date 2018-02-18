import { createSelector } from 'redux-orm'
import orm from '../orm'

export const offersInCommunity = createSelector(
  orm,
  state => state.db,
  state => state.selectedCommunityId,
  (session, hubId) =>
    session.Offer.filter(offer => offer.community === hubId).toModelArray()
)
