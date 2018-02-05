import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { IntlProvider, addLocaleData } from 'react-intl'
import fr from 'react-intl/locale-data/fr'

import rootReducer from './data'
import { firebase, apiMiddleware } from './middleware/firebaseApi'
import App from './App'

import registerServiceWorker from './registerServiceWorker'

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, apiMiddleware))
)

addLocaleData(fr)

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale={navigator.language} defaultLocale="en">
      <App firebase={firebase} />
    </IntlProvider>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
