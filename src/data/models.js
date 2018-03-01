import { fk, many, attr, Model } from 'redux-orm'
import PropTypes from 'prop-types'

// TODO Figure out why 'prop-types/PropTypes' doesn't like this
// import propTypesMixin from 'redux-orm-proptypes'
// const ValidatingModel = propTypesMixin(Model)

class JoatuModel extends Model {}
// class JoatuModel extends ValidatingModel {}
