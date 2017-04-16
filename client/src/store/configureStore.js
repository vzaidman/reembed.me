import { applyMiddleware,createStore } from 'redux'
import createLogger from 'redux-logger'
import rootReducer from '../reducers/index'
import {noop} from 'lodash'

const logger = process.env.NODE_ENV === 'development' ?
  createLogger() : noop

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(logger)
  )
  return store
}
