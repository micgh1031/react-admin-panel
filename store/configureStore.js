import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'
import coMiddleware from 'redux-co'

export default function configureStore (initialState) {
  let store

  if (window.devToolsExtension) {
    store = createStore(rootReducer, initialState,
      compose(
        applyMiddleware(coMiddleware, createLogger()),
        window.devToolsExtension()
      )
    )
  } else {
    store = createStore(rootReducer, initialState, applyMiddleware(coMiddleware, createLogger()))
  }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
