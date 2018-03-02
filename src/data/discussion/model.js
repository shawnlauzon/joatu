import { attr, oneToOne } from 'redux-orm'
import PropTypes from 'prop-types'

import JoatuModel from '../baseModel'

import reducer from './reducer'

// A Discussion is in relation to some topic, e.g. a Project
export default class Discussion extends JoatuModel {}
Discussion.reducer = reducer
Discussion.modelName = 'Discussion'

Discussion.fields = {
  id: attr(),
  type: attr(),
  topic: oneToOne('Project', 'discussion')
}

Discussion.propTypes = {
  id: PropTypes.string
}
