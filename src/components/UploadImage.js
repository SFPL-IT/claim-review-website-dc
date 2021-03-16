import React, {Component} from 'react';
import { Upload, Button, Icon,notification,Modal } from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import { ActionCreators } from '../actions'
const url = process.env.NODE_ENV === 'development' ? "/upload" : "/service/upload"
var fileNumber = 0
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
class UploadImage extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList:this.props.order_info['imagelist']
  };

  handleCancel = () => {
    console.log('cancel')
    this.setState({ previewVisible: false });
  }

  handleRemove = async file => {
    this.props.deleteImagePath(file)
  }

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);

    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => {
    if (fileList.length > this.state.fileList.length){
      this.handleReviewScreenShotSubmit(fileList[fileList.length - 1])
    }
    this.setState({fileList})
  }

  handleReviewScreenShotSubmit(path){
    this.props.setImagePath(path)
    notification['success']({
      message: 'Notification Title',
      description:
        'Thank you for your review, the image is uploaded successfully!',
    });
  }


  render() {
    const { previewVisible, previewImage, fileList } = this.state;
   const uploadButton = (
     <div>
       <Icon type="plus" />
       <div className="ant-upload-text">Upload</div>
     </div>
   );




    const props = {
      name: 'file',
      action: `${url}`,
      listType:"picture-card",
      fileList:fileList,
      onPreview:this.handlePreview,
      onChange: this.handleChange,
      onRemove:this.handleRemove,
      multiple: true,
      data: {
        ASIN: this.props.order_info['items'][0]['ASIN'],
        OrderId: this.props.order_info['AmazonOrderId']
      }
    };
    return (
      <div className="imageuploader">
      <Upload {...props}>
      {(fileList.length >= 2 || !this.props.upload_allowed) ? null : uploadButton}
      </Upload>
      <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
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
export default connect(mapStateToProps,mapDispatchToProps)(UploadImage);
