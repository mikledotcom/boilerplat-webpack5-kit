import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { lostPrjct, newPrjct, roundProjects } from './reducers'

const clientLogger = (store) => (next) => (action) => {
  if (action.type) {
    let result
    console.groupCollapsed('dispatching', action.type)
    console.log('prev state', store.getState())
    console.log('action', action)
    result = next(action)
    console.log('next state', store.getState())
    console.groupEnd()
    return result
  } else {
    return next(action)
  }
}

const serverLogger = (store) => (next) => (action) => {
  console.log('\n  dispatching server action\n')
  console.log(action)
  console.log('\n')
  return next(action)
}

const middleware = (server) => [server ? serverLogger : clientLogger, thunk]

const storeFactory = (server = false, initialState = {}) =>
  applyMiddleware(...middleware(server))(createStore)(
    combineReducers({ lostPrjct, newPrjct, roundProjects }),
    initialState,
  )

export default storeFactory