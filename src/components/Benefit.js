import React, {Component} from 'react';
import { Input, Radio,Checkbox, Icon, Row, Button, Col,message,notification } from 'antd';
import Responsive from 'react-responsive-decorator';
// import cat from '../backcat.png';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { ActionCreators } from '../actions'
import config from 'react-global-configuration'
class Benefit extends Component {

  constructor(props){
    super(props);
    this.state={
      benefit:this.props.order_info['benefit'],
      userName:this.props.user_info['userName'],
      email:this.props.user_info['email'],
      streetAddress:this.props.user_info['streetAddress'],
      streetAddress2:this.props.user_info['streetAddress2'],
      city:this.props.user_info['city'],
      state:this.props.user_info['state'],
      zipCode:this.props.user_info['zipCode'],
    }
  }

  componentDidMount() {

  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  handleInformationSubmit(){
    var seller_id = this.props.order_info['seller_id']
    var asin = this.props.order_info['items'][0]['ASIN']
    var country = this.props.order_info['items'][0]['country']
    var order_id = this.props.order_info['AmazonOrderId']

    if (this.state.benefit == "Amazon Gift Card") {
        if(
          this.state.email !== "" &&
          this.state.userName !== ""){
        if (this.validateEmail(this.state.email)) {

          this.props.setUserInfo(this.state.userName,this.state.email,this.state.streetAddress,this.state.streetAddress2,this.state.city,this.state.state,this.state.zipCode)
          this.props.setBenefit(this.state.benefit)
          this.props.send_feedback()
          this.props.gotoGetBenefit()
        } else {
          notification['error']({
            message: 'Check your email!',
            description:
              <div>
                <p>Please check your email, the format is not right.</p>
              </div>
          });
        }
      } else {
        notification['error']({
          message: 'Notification Title',
          description:
            <div><p>Please check if you have fulfill the username, email</p>
            </div>
        });
      }

    } else if(this.state.benefit == "Same Free Product") {
      if (this.state.streetAddress !== "" &&
        // this.state.streetAddress2 !== "" &&
        this.state.city !== "" &&
        this.state.state !== "" &&
        this.state.zipCode !== "" &&
        this.state.email !== "" &&
        this.state.userName !== ""){
        if (this.validateEmail(this.state.email)) {

          this.props.setUserInfo(this.state.userName,this.state.email,this.state.streetAddress,this.state.streetAddress2,this.state.city,this.state.state,this.state.zipCode)
          this.props.setBenefit(this.state.benefit)
          this.props.send_feedback()
          this.props.gotoGetBenefit()
        } else {
          notification['error']({
            message: 'Check your email!',
            description:
              <div>
                <p>Please check your email, the format is not right.</p>
              </div>
          });
        }
      } else {
        notification['error']({
          message: 'Notification Title',
          description:
            <div><p>Please check if you have fulfill the username, email, or address information</p>
            </div>
        });
      }
    } else {
      notification['error']({
          message: 'Notification Title',
          description:
            <div><p>Please check one of the benefit option</p>
            </div>
      });
    }

  }


  handleStreetAddressChange = e =>{
    this.setState({
      streetAddress: e.target.value,
    })
  }

  handleStreetAddress2Change = e =>{
    this.setState({
      streetAddress2: e.target.value,
    })
  }

  handleCityChange = e =>{
    this.setState({
      city: e.target.value,
    })
  }

  handleStateChange = e =>{
    this.setState({
      state: e.target.value,
    })
  }

  handleZipCodeChange = e =>{
    this.setState({
      zipCode: e.target.value,
    })
  }

  handleUserNameChange = e =>{
    this.setState({
      userName: e.target.value,
    })
  }

  handleEmailChange = e =>{
    this.setState({
      email: e.target.value,
    })
  }

  handleBenefitMethod= e =>{
    this.setState({
      benefit: e.target.value,
    });
    var mailing = document.querySelector('.mailing');
    if (e.target.value ==='Same Free Product') {
      mailing.style.display = '';
    } else {
      mailing.style.display = 'none';
    }
  }

  handleCustomersClub= e =>{
    this.setState({
      customerClub: e.target.checked,
      // TODO, 暂时未处理这个数据
    });
  }

  goback(){
    this.props.back()
  }

  render() {

    return (

      <div className="content">
        <div className="row">
          <p className="p p-l"><strong>Please select your benefit and enter your name, email to receive it.</strong></p>
        </div>
        <div className="row">
          <Radio.Group onChange={this.handleBenefitMethod} value={this.state.benefit}>
            <Radio value={`Amazon Gift Card`}>${this.props.order_info['reward']} Amazon Gift Card</Radio>
            <Radio value={"Same Free Product"}>Same Free Product</Radio>
          </Radio.Group>
        </div>

      <div className="row user-info">
        <div className="mailing" style={{display: 'none'}}>
          <div className="form-row">
            <Input
              onChange = {
                value => this.handleStreetAddressChange(value)
              }
              className="myinput"
              value = {this.state.streetAddress}
              placeholder="Street address"
            />
          </div>
          <div className="form-row">
            <Input
              onChange = {
                value => this.handleStreetAddress2Change(value)
              }
              className="myinput"
              value = {this.state.streetAddress2}
              placeholder="Apt., ste., bldg. (optional)"
            />
          </div>
          <div className="form-row multi-inputs-3">
            <Input
              onChange = {
                value => this.handleCityChange(value)
              }
              className="myinput"
              value = {this.state.city}
              placeholder="City"
            />
            <Input
              onChange = {
                value => this.handleStateChange(value)
              }
              className="myinput"
              value = {this.state.state}
              placeholder="State"
            />
            <Input
              onChange = {
                value => this.handleZipCodeChange(value)
              }
              className="myinput"
              value = {this.state.zipCode}
              placeholder="Zip code"
            />
          </div>
        </div>
        <div className="basic">
          <div className="form-row">
            <Input
              onChange = {
                value => this.handleUserNameChange(value)
              }
              className="myinput"
              value = {this.state.userName}
              placeholder="Name"
            />
          </div>
          <div className="form-row">
            <Input
              onChange = {
                value => this.handleEmailChange(value)
              }
              className="myinput"
              value = {this.state.email}
              placeholder="Email address"
            />
          </div>
        </div>
      </div>

      <div className="row">
        <Checkbox onChange={
          checked => this.handleCustomersClub(checked)
        }>Join our Customers Club to Receive Newly Released Products, Amazon Gift Card & Lifetime Warranty</Checkbox>
      </div>

      <div className="row-lg">
        <p className="x-small quiet">{config.get('source')} is the sole owner of information collected from its customers. We will not sell or share this information with third parties in ways different from what is disclosed in our Privacy Policy.</p>
      </div>

      <div className="row">
        <Button type="primary" className="btn-next" onClick={this.handleInformationSubmit.bind(this)}>Next</Button>
        <Button type="default" className="mydefaultbtn" onClick={this.goback.bind(this)}>Go Back </Button>
      </div>
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
export default connect(mapStateToProps,mapDispatchToProps)(Benefit);
