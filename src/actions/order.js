import * as types from './types';

import axios from 'axios';
import config from 'react-global-configuration';
import configuration from '../config/config';

import {
  notification,
} from 'antd';
import REMOTEHOST from '../remote-host';
const remoteUrl = REMOTEHOST;


function setOrderInfo(response) {

  return {
    type: types.SET_ORDER_INFO,
    data: response
  }
}

export function sendOrderId(order_id,email){

  return (dispatch,getState) => {
    console.log(remoteUrl)
    var request_url = `${remoteUrl}/graphql?query={order(amazon_order_id:%20%22${order_id}%22)%20{seller_id%20AmazonOrderId%20redeem%20{requestDate}%20items%20{ASIN%20country%20ItemPriceUSD}%20reward}}`

    return axios.get(request_url).then((response)=>{
      var result = response.data.data.order
      if (OrderIdResponse(dispatch,result)){
        dispatch(push('feedback'))
      }
    }).catch((err)=>{
      console.log(err);

      notification['error']({
        message: 'Server is under maintenance.',
        description:'Sorry! Server is under maintenance. Please try later!'
      })
    })
  }
}

function OrderIdResponse(dispatch,data){
  if (data === null){
    notification['error']({
      message: 'Wrong order number.',
      description:'You order number is not right. Please check it again, the order id should be like this: 123-1234567-1234567'
    });
  }else if (data.items.length === 0){
    notification['error']({
      message: 'No Item.',
      description:'Sorry, there is no item in this order. Please change the order ID and try again.'
    });
  }else if (data.redeem === null){
    if (!data.reward) {
      data.reward = config.get('amount')
    }
    dispatch(setOrderInfo(data))
    notification['success']({
      message: 'Notification Title',
      description:
        'Thank you for your purchasing',
    });
    return true
  }else {
    notification['error']({
      message: 'Sorry!',
      description:
        'I am sorry that, you have redeemed this order. Please change the order ID and have another try.',
    });
  }
  return false
}

export function push(titleKey){
  return {
    type: types.PUSH_TO,
    target: titleKey
  }
}

export function back(){
  return {
    type: types.BACK_GO,
  }
}

export function setStar(star){
  return{
    type: types.SET_STAR,
    star:star
  }
}

export function setPeriod(period){
  return{
    type: types.SET_PERIOD,
    period:period
  }
}

export function goNegative (star,period){
  return (dispatch,getState) => {
    dispatch(setStar(star))
    dispatch(setPeriod(period))
    dispatch(push('negativeReview'))
  }
}

export function gobenefit(star,period){
  return (dispatch,getState) => {
    dispatch(setStar(star))
    dispatch(setPeriod(period))
    dispatch(push('benefit'))
  }
}

export function gotoGetBenefit(){
  return (dispatch,getState) => {
    dispatch(push('getbenefit'))
  }
}

export function setImagePath(path){
  return{
    type: types.SET_IMAGE_LIST,
    path:path
  }
}

export function deleteImagePath(path){
  return{
    type: types.DELETE_IMAGE,
    path:path
  }
}



export function setUserInfo(userName,email,streetAddress,streetAddress2,city,state,zipCode){
  return{
    type: types.SET_USER_INFO,
    userName:userName,
    email:email,
    streetAddress:streetAddress,
    streetAddress2:streetAddress2,
    city:city,
    state:state,
    zipCode:zipCode
  }
}

export function setFeedbackText(text){
  return{
    type: types.SET_FEEDBACK_TEXT,
    text:text
  }
}

export function setBenefit(benefit){
  return{
    type: types.SET_BENEFIT,
    benefit:benefit
  }
}


function get_feedback_url(getState){
  var mystate = getState()
  var d = new Date();
  var today = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
  var country = mystate.order_info['items'][0]['country']
  var asin = mystate.order_info['items'][0]['ASIN']
  var order_id = mystate.order_info['AmazonOrderId']
  var period = mystate.order_info['period']
  var star = mystate.order_info['star']
  var seller_id = mystate.order_info['seller_id']
  var reward = mystate.order_info['reward'] ? mystate.order_info['reward'] : config.get('amount')
  var benefit = mystate.order_info['benefit']
  var path = mystate.order_info['imagelist'].map((img)=>{return img.response.fileName})
  var userName = mystate.user_info['userName']
  var email = mystate.user_info['email']

  var streeAddress = mystate.user_info['streetAddress']
  var streetAddress2 = mystate.user_info['streetAddress2']
  var city = mystate.user_info['city']
  var state = mystate.user_info['state']
  var zipCode = mystate.user_info['zipCode']
  var new_address = streeAddress.concat( " ", streetAddress2, "<br>", city, "<br>", state, " ", zipCode);


  var request_url = `${remoteUrl}/graphql?query=mutation%20addRedeem%20{addRedeem(requestDate:"${today}",seller_id:"${seller_id}",AmazonOrderId:"${order_id}",asin:"${asin}",country:"${country}",source:"${config.get('source')}",amount:"${reward}",usingTime:"${period}",star:${star},how_to_help:"${benefit}",name:"${userName}",email:"${email}",new_address:"${new_address}",newsletter:true)%20{id}}`
  return request_url

}

export function send_feedback(){
  return (dispatch,getState) => {
      var request_url = get_feedback_url(getState)
      console.log(request_url)
    axios.get(request_url).then(response => {
      notification['success']({
        message: 'Got It!',
        description:
          'Thank you for your review and information, we will contact you as soon as possible',
      });
    })
    }
}
