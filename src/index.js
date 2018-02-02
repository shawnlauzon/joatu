import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import projects from './data'
import './index.css'
import './fire'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(projects, devToolsEnhancer())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
