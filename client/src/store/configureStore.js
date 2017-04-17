import { applyMiddleware,createStore } from 'redux'
import createLogger from 'redux-logger'
import rootReducer from 'reducers'

const middlewares = []

if(process.env.NODE_ENV === 'development'){
  middlewares.push(createLogger())
}

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  )
  return store
}
