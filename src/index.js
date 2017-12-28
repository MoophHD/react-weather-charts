import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import './styles/bootstrap.min.css'
import './styles/app.scss'
import configureStore from './store/configureStore'

const store = configureStore()


render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
)
