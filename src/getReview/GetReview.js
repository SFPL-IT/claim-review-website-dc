import React, {
  Component,
} from 'react';
import GetYourBenefit from '../components/GetYourBenefit';
import OrderId from '../components/OrderId';
import NegtiveReview from '../components/NegtiveReview';
import Feedback from '../components/Feedback';
import PositiveReview from '../components/PositiveReview';
import SuccessBanner from '../components/SuccessBanner';
import Responsive from 'react-responsive-decorator';
import config from 'react-global-configuration';
import configuration from '../config/config';
import myData from '../data/reward.json';
import {
  Card,
  message,
  notification,
  Badge,
} from 'antd';
import axios from 'axios';
import styles from './GetReview.css'
import REMOTEHOST from '../remote-host';



const headStyle = {
  backgroundColor: 'transparent',
  textAlign: "center",
  fontSize: 24,
  width: '100%',
  border: 0,
  overflowX : 'auto',
  overflowY : 'auto',
};



const backwrap = {

  backgroundColor:'#fff',
  borderRadius:10,
  boxShadow: "1px 3px 1px rgba(0,0,0,0.4)"
};

const defaultReward = 10;

// const remoteUrl = process.env.NODE_ENV === 'development' ? "http://300gideon.local/" : "https://bp.sellerprofitpro.com/"
const remoteUrl = REMOTEHOST;

class GetReview extends Component {
  constructor(props){
    super(props);
    this.checkOrderId = this.checkOrderId.bind(this)
    this.checkFeedback = this.checkFeedback.bind(this)
    this.handleRateChange = this.handleRateChange.bind(this)
    this.submitFeedback = this.submitFeedback.bind(this)
    this.submitReview = this.submitReview.bind(this)
    this.handleBenefitMethod = this.handleBenefitMethod.bind(this)
    this.handleUserNameChange = this.handleUserNameChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleInformationSubmit = this.handleInformationSubmit.bind(this)
    this.handleReviewScreenShotSubmit = this.handleReviewScreenShotSubmit.bind(this)
    this.handleFeedbackTextChange = this.handleFeedbackTextChange.bind(this)
  }
  state = {
    key: 'order',
    noTitleKey: 'order',
    path: [],
    value: 1,
    star: 0,
    review: 0,
    benefit: "",
    submit: 0,
    reward: config.get('amount'),
    feedback: 0,
    period: "",
    userName: "",
    email: "",
    order:{
      items:[]
    },
    feedbackText: "",
    reviewImage: false,
    success: false,
    isMobile: false
  };

  componentDidMount() {

  }

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  handlePeriodChange = e => {
    this.setState({
      period: e.target.value,
    });
  };

  handleFeedbackChange = e => {
    this.setState({
      feedback: e.target.value,
    });
  };

  handleBenefitMethod= e =>{
    this.setState({
      benefit: e.target.value,
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

  checkOrderId(orderId){
    orderId = orderId.replace(/[^0-9]/g, '');
    const newOrderId = orderId.slice(0,3) + '-' + orderId.slice(3,10) + '-' + orderId.slice(10,17);
    axios.get(`${remoteUrl}/graphql?query={order(amazon_order_id:%20%22${newOrderId}%22)%20{seller_id%20AmazonOrderId%20redeem%20{requestDate}%20items%20{ASIN%20country%20ItemPriceUSD}%20reward}}`).then(response => {
      if (response.data.data.order === null) {
        notification['error']({
          message: 'Wrong order number.',
          description:
            <div><p>You order number is not right. Please check it again, the order id should be like this: </p>
            <p>123-1234567-1234567</p></div>
        });
      } else if (response.data.data.order.items.length === 0) {
        notification['error']({
          message: 'No Item.',
          description:
            <div><p>Sorry, there is no item in this order. Please change the order ID and try again.</p></div>
        });
      } else if (response.data.data.order.redeem === null) {
        this.setState({
          order: response.data.data.order,
          reward: response.data.data.order.reward || this.state.reward
        })
        notification['success']({
          message: 'Notification Title',
          description:
            'Thank you for your purchasing',
        });
        this.setState({
          noTitleKey: 'feedback'
        });
      } else {
        notification['error']({
          message: 'Sorry!',
          description:
            'I am sorry that, you have redeemed this order. Please change the order ID and have another try.',
        });
      }
    }).catch(err => {
      console.log(err)
    })
  }

  handleRateChange = value => {
    this.setState({ star: value });
  };

  checkFeedback(){
    if (this.state.star > 0 && this.state.period !== "") {
      this.setState({
        noTitleKey: 'review'
      });
      if (this.state.star >= 4) {
        this.setState({
          review: 1
        });
      } else {
        this.setState({
          review: 0
        });
      }
    } else {
      notification['error']({
        message: 'Notification Title',
        description:
          <div><p>Please fulfill the two question.</p></div>
      })
    }
  }
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // handleInformationSubmit(){
  //   if (this.state.benefit !== "" && this.state.email !== "" && this.state.userName !== ""){
  //     if (this.validateEmail(this.state.email)) {
  //       document.querySelector("#reviewWrap").removeChild(document.querySelector("#reviewWrap").firstChild)
  //       this.setState({
  //         success: true
  //       })
  //       var d = new Date();
  //       var today = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();

  //       notification['success']({
  //         message: 'Got It!',
  //         description:
  //           'Thank you for your review and information, we will contact you as soon as possible',
  //       });
  //   } else {
  //     notification['error']({
  //       message: 'Notification Title',
  //       description:
  //         <div><p>Please check if you have fulfill the user name, email, and benefit method</p>
  //         </div>
  //     });
  //   }
  // }
  // }
  handleInformationSubmit(){
    if (this.state.benefit !== "" && this.state.email !== "" && this.state.userName !== ""){
      if (this.validateEmail(this.state.email)) {
        document.querySelector("#reviewWrap").removeChild(document.querySelector("#reviewWrap").firstChild)
        this.setState({
          success: true
        })
        var d = new Date();
        var today = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
        let url = `${remoteUrl}/graphql?query=mutation%20addRedeem%20{addRedeem(requestDate:"${today}",seller_id:"${this.state.order.seller_id}",AmazonOrderId:"${this.state.order.AmazonOrderId}",asin:"${this.state.order.items[0].ASIN}",country:"${this.state.order.items[0].country}",source:"${config.get('source')}",amount:"${this.state.reward}",usingTime:"${this.state.period}",star:${this.state.star},how_to_help:"${this.state.benefit}",name:"${this.state.userName}",email:"${this.state.email}",newsletter:true,attachments:"${this.state.path.join('||')}")%20{id}}`
        axios.get(url).then(response => {
          notification['success']({
            message: 'Got It!',
            description:
              'Thank you for your review and information, we will contact you as soon as possible',
          });
        })
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
          <div><p>Please check if you have fulfill the user name, email, and benefit method</p>
          </div>
      });
    }
  }

  submitFeedback(){
    if (this.state.feedbackText !== "" && this.state.userName !== "" && this.state.email !== "" ) {
      if (this.validateEmail(this.state.email)) {
        var d = new Date();
        var today = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
        let url = `${remoteUrl}/graphql?query=mutation%20addRedeem%20{addRedeem(requestDate:"${today}",seller_id:"${this.state.order.seller_id}",AmazonOrderId:"${this.state.order.AmazonOrderId}",asin:"${this.state.order.items[0].ASIN}",country:"${this.state.order.items[0].country}",source:"${config.get('source')}",amount:"${this.state.reward}",usingTime:"${this.state.period}",star:${this.state.star},how_to_help:"${this.state.feedbackText}",name:"${this.state.userName}",email:"${this.state.email}",newsletter:true,attachments:"${this.state.path}")%20{id}}`
        axios.get(url).then(response => {
          document.querySelector("#reviewWrap").removeChild(document.querySelector("#reviewWrap").firstChild)
          this.setState({
            success: true
          })
          notification['success']({
            message: 'Got It!',
            description:
              'Thank you for your review and information, we will contact you as soon as possible',
          });
        })
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
        message: 'Please leave your feedback.',
        description:
          <div><p>Please tell us how to solve your problem and leave your name, email so we can contact you soon.</p>
          </div>
      });
    }
  }

  handleReviewScreenShotSubmit(path){
    this.setState({
      reviewImage: true,
      path: path
    })
    notification['success']({
      message: 'Notification Title',
      description:
        'Thank you for your review, the image is uploaded successfully!',
    });
  }

  submitReview(){
    var image_list = document.getElementsByClassName('ant-upload-list-item-name')
    if (this.state.reviewImage === true && image_list.length > 0) {

      document.querySelector('#reviewWrap').removeChild(document.querySelector('#reviewb'))
      this.setState(
        {submit :1}
      )

      message.success('Thank you for your feedback.')
    } else {
      notification['error']({
        message: 'Notification Title',
        description:
          <div><p>Please upload the screenshot of your review</p>
          </div>
      });
    }
  }

  handleFeedbackTextChange = e => {
    this.setState({feedbackText: e.target.value})
  }

  render() {

    const tabListNoTitle = [{
        key: 'order',
        // tab: '1. Your Order'
        tab:
        <div>
          <p>1. Your Order</p>
        </div>,
      },
      {
        key: 'feedback',
        tab:
        <div>
          <p>2. Your Feedback</p>
        </div>,
      },
      {
        key: 'review',
        tab:
         <div>
          <p>3. Your Benefit</p>
        </div>,
      },
    ];
    const contentListNoTitle = {
      order:
        <OrderId checkOrderId={this.checkOrderId}/>
      ,
      feedback:
        <Feedback handlePeriodChange={this.handlePeriodChange} handleRateChange={this.handleRateChange} checkFeedback={this.checkFeedback} star={this.state.star} period={this.state.period}/>
      ,
      review:
        (
          this.state.review === 1 ?
            <div id='reviewWrap'>
              <PositiveReview  Country={this.state.order.items[0].country} OrderId={this.state.order.AmazonOrderId} reward={this.state.reward} ASIN={this.state.order.items[0].ASIN} handleReviewScreenShotSubmit={this.handleReviewScreenShotSubmit} submitReview={this.submitReview}/>
              {this.state.submit === 1 ? <GetYourBenefit handleBenefitMethod={this.handleBenefitMethod} reward={this.state.reward} handleInformationSubmit={this.handleInformationSubmit} benefit={this.state.benefit} handleUserNameChange={this.handleUserNameChange} handleEmailChange={this.handleEmailChange}/> : ""}
              {this.state.success === true ? <SuccessBanner positive={true}/> : ""}
            </div>
            :
            <div id='reviewWrap'>
              <NegtiveReview handleFeedbackTextChange={this.handleFeedbackTextChange} handleFeedbackChange={this.handleFeedbackChange} feedback={this.state.feedback} submitFeedback = {this.submitFeedback} handleUserNameChange={this.handleUserNameChange} handleEmailChange={this.handleEmailChange}/>
              {this.state.success === true ? <SuccessBanner positive={false}/> : ""}
            </div>
        )
    };

    let className = this.state.isMobile === true ? "cellphone" : "desktop";


    return (

        <div className="desktop">
          <div  className="toptitle">
            <h1>Claim Your Benefit Now!!!</h1>
          </div>
        <div className="tablist">
        <div id="order" className="tabunit activeTab step1">
          <p>1. Your Order</p>
        </div>
        <div id="feedback"  className={this.state.noTitleKey == 'feedback' || this.state.noTitleKey == 'review' ? "tabunit activeTab  step2" : "tabunit  step2" }>
          <p>2. Your Feedback</p>
        </div>
        <div id="review step3" className={this.state.noTitleKey == 'review' ? "tabunit activeTab step3" : "tabunit step3" }>
          <p>3. Your Benefit</p>
        </div>
        </div>

          <Card
            type="inner"
            headStyle={headStyle}
            bordered={false}
            style = {
              {
                fontSize: 20,
                width: '100%',
                backgroundColor: 'transparent',
                border: 0
              }
            }

            >
            {contentListNoTitle[this.state.noTitleKey]}

          </Card>

      </div>
    )
  }
}

export default Responsive(GetReview);
