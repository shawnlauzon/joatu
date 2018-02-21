import { attr, fk } from 'redux-orm'
import PropTypes from 'prop-types'

import JoatuModel from '../baseModel'

import reducer from './reducer'

export default class Request extends JoatuModel {}
Request.reducer = reducer
Request.modelName = 'Request'

Request.fields = {
  id: attr(),
  name: attr(),
  owner: fk('User', 'requests'),
  hub: fk('Hub', 'requests')
}

Request.propTypes = {
  id: PropTypes.string
}
