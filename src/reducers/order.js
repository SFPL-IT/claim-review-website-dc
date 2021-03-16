import * as types from '../actions/types';
import config from 'react-global-configuration'
var reward_state = {
  seller_id:'',
  AmazonOrderId:'',
  star:0,
  period:'',
  redeem: null,
  reward:'',
  benefit:'',
  imagelist:[]
}
export const order_info = (state = reward_state,action) => {
  switch(action.type){
    case types.SET_ORDER_INFO:
       return Object.assign({},state,action.data)
    case types.SET_STAR:
       return Object.assign({},state,{
        star: action.star
      })
    case types.SET_FEEDBACK_TEXT:
        return Object.assign({},state,{
          feedbackText: action.text
      })
    case types.SET_BENEFIT:
          return Object.assign({},state,{
            benefit: action.benefit
      })
    case types.SET_IMAGE_LIST:
          return Object.assign({},state,{'imagelist':[
            ...state.imagelist,
            action.path
      ]})
    case types.DELETE_IMAGE:
          return Object.assign({},state,{'imagelist':[
            ...state.imagelist.filter(item => item !== action.path)
      ]})
    case types.SET_PERIOD:
        return Object.assign({},state,{
        period: action.period
      })
    default:
       return state
  }
}



export const step_info = (state = ['order'],action) => {
  switch (action.type) {
    case types.PUSH_TO:
        return [
        ...state,
        action.target
      ]
    case types.BACK_GO:
        return state.filter(val => val !== state[state.length-1] )
    default:
        return state

  }
}

var user_state = {
  userName:'',
  email:'',
  streetAddress: '',
  streetAddress2: '',
  city: '',
  state: '',
  zipCode: ''
}

export const user_info = (state = user_state,action) => {
  switch (action.type) {
    case types.SET_USER_INFO:
        return Object.assign({},state,{
         userName: action.userName,
         email: action.email,
         streetAddress: action.streetAddress,
         streetAddress2: action.streetAddress2,
         city: action.city,
         state: action.state,
         zipCode: action.zipCode
       })
    default:
        return state
    }
}
