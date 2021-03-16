import React, { Component } from 'react';
import {
  Card,
  Button,
  Row,
  Col,
  notification,
  Radio,
  Rate,
} from 'antd';
import Responsive from 'react-responsive-decorator';
import './component.css'
// import cat from '../backcat.png';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { ActionCreators } from '../actions'
const desc = ['terrible', 'too bad', 'bad', 'normal', 'good'];

class Feedback extends Component {


    state = {
      period:this.props.order_info['period'],
      star:this.props.order_info['star']
    };


  handlePeriodChange = e => {
    this.setState({
      period: e.target.value,
    });
  };

  goback(){
    this.props.back()
  }


  checkFeedback(){

    if (this.state.star > 0) { // && this.state.period !== ""
      if (this.state.star<4){
        this.props.goNegative(this.state.star,this.state.period)
        return
      }
      this.props.gobenefit(this.state.star,this.state.period)

    } else {
      notification['error']({
        message: 'Notification Title',
        description:
          <div><p>Please fulfill the two question.</p></div>
      })
    }
  }

  handleRateChange = value => {
    this.setState({ star: value });
  };

  render() {


      // <div className="feedwrapper">

      //     <p className="questitle">How long have you been using it?</p>
      //     <Radio.Group onChange={this.handlePeriodChange} value={this.state.period}>
      //       <Radio className="opt"  value={"less than 7 days"}>
      //       Just started (less than 7 days)
      //       </Radio>
      //       <Radio className="opt"  value={"for a while"}>
      //       I've been using it for a while!
      //       </Radio>
      //       <Radio  className="opt" value={"more than 60 days"}>
      //       I have been using it for more than 60 days.
      //       </Radio>
      //     </Radio.Group>
      //   </div>
    return (
      <div className="content">

        <div className="row-lg">
          <p className="p-l"><strong>How satisfied are you with our product?</strong></p>
          <Rate tooltips={desc} onChange={this.handleRateChange} value={this.state.star} />
        </div>

        <div className="row">
          <Button className="btn-next" onClick={this.checkFeedback.bind(this)}>Next</Button>
       </div>
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
export default connect(mapStateToProps,mapDispatchToProps)(Feedback);
