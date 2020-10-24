import {combineReducers} from 'redux'
import {connectRouter} from "connected-react-router"

import phones from './phones'

export default history => combineReducers({
  router: connectRouter(history),
  phones
})
