import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
// import { devToolsEnhancer } from 'redux-devtools-extension'
import projects from './data'
import './index.css'
import './firebase'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(projects, applyMiddleware(thunk)) //devToolsEnhancer())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
