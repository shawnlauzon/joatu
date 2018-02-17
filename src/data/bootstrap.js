import orm from './orm'

const bootstrap = () => {
  // Get the empty state according to our schema.
  const state = orm.getEmptyState()

  // Return the whole Redux initial state.
  return {
    db: state
    // authenticatedUserId: '',
    // selectedCommunityId: ''
  }
}

export default bootstrap
