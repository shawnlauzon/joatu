import { attr } from 'redux-orm'
import PropTypes from 'prop-types'

import JoatuModel from '../baseModel'

import reducer from './reducer'

export default class Community extends JoatuModel {}
Community.reducer = reducer
Community.modelName = 'Community'

Community.fields = {
  id: attr(),
  name: attr(),
  coordinates: attr()
}

Community.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  coordinates: PropTypes.shape({
    latitutde: PropTypes.number.isRequired,
    longitude: PropTypes.string.isRequired
  }).isRequired
}
