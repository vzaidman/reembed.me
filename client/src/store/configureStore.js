import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'

import {createLogger} from 'redux-logger'

import createSagaMiddleware from 'redux-saga'

import rootReducer from 'reducers'
import mySaga from 'sagas'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]

if(process.env.NODE_ENV === 'development'){
  middlewares.push(createLogger())
}

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(...middlewares)
    )
  )

  sagaMiddleware.run(mySaga)

  return store
}
