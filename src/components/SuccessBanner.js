import React, {Component} from 'react';
import './component.css'
import cat from '../backcat.png';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { ActionCreators } from '../actions'
import { Rate } from 'antd';
import UploadImage from './UploadImage';
const desc = ['terrible', 'too bad', 'bad', 'normal', 'good'];
const headStyle = {
  textAlign: "center",
  color: '#333',
  fontSize: 24,
  overflowX : 'auto',
  overflowY : 'auto',
};
class SuccessBanner extends Component {

  getReward(){
    if (this.props.order_info['star'] >= 4){

      if (this.props.order_info['benefit'] == 'Amazon Gift Card'){
        var final_reward = '$' + this.props.order_info['reward'] + ' '+ this.props.order_info['benefit']
      }else{
        var final_reward = this.props.order_info['benefit']
      }
      return (<div><label className="labela">Your reward:</label><p>{final_reward}</p></div>)
    }else{
      return (<div><label className="labela">Your Feedback:</label><p>{this.props.order_info['benefit']}</p></div>)
    }
  }
  render() {
    return (
      <div className="feebox">
        <div className="feedwrapper thankyou">
        <p>Thank you for you review !!</p>
        <p>We will reply to you as soon as possible.</p>

        <ul className="resultblock">
          <li><label className="labela">Order Id:</label><p>{this.props.order_info['AmazonOrderId']}</p></li>

          <li><label className="labela">Usage Period:</label> <p>{this.props.order_info['period']}</p></li>
          <li><label className="labela">Your Rating:</label><Rate tooltips={desc} disabled={true}  value={this.props.order_info['star']} /></li>
         

          <li>{this.getReward()}</li>
        </ul>
        </div>
        {this.props.order_info['star']>=4 ? <div className="backimg forthanking"><img src={cat}/></div> : null}

      </div>
    )
  }
}
function mapStateToProps(state){
  return{
    order_info:state.order_info,
    step_info:state.step_info,
    user_info:state.user_info
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(SuccessBanner);
