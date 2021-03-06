import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'

import { IntlProvider, addLocaleData } from 'react-intl'
import fr from 'react-intl/locale-data/fr'

import rootReducer from './data/reducer'
import apiMiddleware from './middleware/firebaseApi'
import App from './App'

import registerServiceWorker from './registerServiceWorker'

import { bootstrap } from './data'

const middlewares = [thunk, apiMiddleware]

if (false) {
  middlewares.push(logger)
}

const store = createStore(
  rootReducer,
  bootstrap(),
  composeWithDevTools(applyMiddleware(...middlewares))
)

addLocaleData(fr)

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale={navigator.language} defaultLocale="en">
      <App />
    </IntlProvider>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
