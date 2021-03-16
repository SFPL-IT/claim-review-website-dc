import { combineReducers } from 'redux';
import {order_info,step_info,user_info} from './order'

export default function getRootReducer() {
  return combineReducers({
    order_info:order_info,
    step_info:step_info,
    user_info:user_info
  })
}
