import React, { Component } from 'react';
import UploadImage from './UploadImage';
import './component.css'
import {
  Button,
  Row,
  message,
  notification,
  Col,
} from 'antd';
// import cat from '../backcat.png';
import sample from '../sample.jpg';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { ActionCreators } from '../actions'

import config from 'react-global-configuration'


const reviewCardStyle = {
  color : '#333',
  fontSize : 14,
  // paddingLeft: '30%',
  // paddingRight: '30%',
  margin: 'auto',
  width: '70%',
  overflowX : 'auto',
  overflowY : 'auto',
}


class PositiveReview extends Component {

  getRewardPrice(){
    var order_reward = this.props.order_info['reward']
    if (order_reward == null){
      return 10
    }else{
      return order_reward
    }
  }

  goback(){
    this.props.back()
  }

  submitReview(){
    this.props.push('SuccessBanner')
  }

  check_url_tail(country){
      if ( country == 'CA') {
        return 'ca'
      }else if( country == 'UK'){
        return 'co.uk'
      }else{
        return 'com'
      }
    }


  render() {
    var country = this.check_url_tail(this.props.order_info['items'][0]['country'])

    var asin = this.props.order_info['items'][0]['ASIN']
    var order_id = this.props.order_info['AmazonOrderId']

    return (
      <div id='reviewb' className="content">
        <h2 className="h2">Unlock Your Benefit</h2>
        <p className="p">Dear customer, thank you so much for your precious feedback about our product! We have recorded it and will continue to improve our product according to your suggestions!</p>
        <p className="p">We are a newly start up business, with several young staff working together, trying everything possible to provide the best products and the most satisfying services to our customers. But as you may not know, low ratings might cause Amazon to limit the selling rights of our new store, so we will never have any chance to develop and improve our business any more.</p>
        <p className="p">In this case, we want to kindly ask, could you do us a favor to <strong className="highlight">leave us a 5-star review on Amazon</strong>? It will greatly help us to serve you better!</p>
        <p className="p center-align">
          <Button type="primary" className="btn-highlight btn-round"  target="_blank" href={`https://www.amazon.${country}/review/create-review/?asin=${asin}%3A5`}>Click To Leave A 5-Star Review </Button>
        </p>
        <p className="p">Leave feedback for the products on Amazon and claim all offers!</p>
        <p className="p">After the review is posted, you will receive one confirmation email from amazon, please forward Amazon’s confirmation email to <a href={"mailto:" + config.get('email')}>{config.get('email')}</a>, then you can unlock your benefit!</p>
        <p className="p">We suggest you record the email address above for further reference. And here’s a sample of the confirmation email you’ll receive:</p>
        <p className="p"><img src={sample} className="screenshotamazon"/></p>
        <p className="p">If you have any other questions about this survey, please contact <a href={"mailto:" + config.get('email')}>{config.get('email')}</a>.</p>
      </div>
    );
  }
}
function mapStateToProps(state){
  return{
    order_info:state.order_info,
    step_info:state.step_info
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(PositiveReview);
