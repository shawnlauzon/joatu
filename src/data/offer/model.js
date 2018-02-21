import { fk, attr } from 'redux-orm'
import PropTypes from 'prop-types'

import JoatuModel from '../baseModel'

import reducer from './reducer'

export default class Offer extends JoatuModel {}
Offer.reducer = reducer
Offer.modelName = 'Offer'

Offer.fields = {
  id: attr(),
  name: attr(),
  owner: fk('User', 'offers'),
  hub: fk('Hub', 'offers')
}

Offer.propTypes = {
  id: PropTypes.string
}
