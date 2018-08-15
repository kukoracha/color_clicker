import {createStore,  applyMiddleware, combineReducers, compose } from 'redux'
import reducers from './reducers'

const rootReducer = combineReducers({
    ...reducers,
})

const initialState = {}
const enhancers = []
const middleware = []

const composedEnhancers = compose(
    ...applyMiddleware(...middleware),
    ...enhancers
)

const store = createStore(
    rootReducer,
    initialState,
    composedEnhancers,
)

export default store