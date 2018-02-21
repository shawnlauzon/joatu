import { attr } from 'redux-orm'
import PropTypes from 'prop-types'

import JoatuModel from '../baseModel'

import reducer from './reducer'

export default class Hub extends JoatuModel {}
Hub.reducer = reducer
Hub.modelName = 'Hub'

Hub.fields = {
  id: attr(),
  name: attr(),
  location: attr()
}

Hub.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  location: PropTypes.shape({
    latitutde: PropTypes.number.isRequired,
    longitude: PropTypes.string.isRequired
  }).isRequired
}
