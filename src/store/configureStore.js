import { createStore, applyMiddleware } from 'redux'
import index from '../reducers'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';


export default function configureStore(initialState) {
  const logger = createLogger()
  const store = createStore(
    index,
    initialState,
    applyMiddleware(thunk, logger),
  ) 

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
