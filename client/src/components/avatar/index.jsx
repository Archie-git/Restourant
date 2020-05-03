import React from 'react';
import { Upload, Icon, Modal } from 'antd';
import { reqImgDelete } from '../../api/index';

class Avatar extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
    };
    UNSAFE_componentWillMount = () => {
        console.log(this.props);
        let fileList = [];
        fileList.push({
            uid: -1,
            name: this.props.img,
            status: 'done',
            url: 'http://localhost:3001/upload/'+this.props.img
        });
        this.setState({fileList: fileList})
    };
    getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };
    handleCancel = () => this.setState({ previewVisible: false });
    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await this.getBase64(file.originFileObj);
        }
        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };
    handleChange = async ({ file, fileList }) => {
        if(file.status === 'done'){
            let response = file.response;
            file = fileList[fileList.length-1];
            file.name = response.data.name;
            file.url = response.data.url;
        } else if(file.status === 'removed'){
            let response = await reqImgDelete(file.name);
            if(response.status === 0){
                let fileIndex = 0;
                fileList.forEach((item, index) => {
                    if(item.name === file.name){
                        fileIndex = index
                    }
                });
                fileList.splice(fileIndex, 1);
            }
        }
        let urls = fileList.map(item => {
            return item.url;
        });
        this.props.onChange(urls.join(','));
        this.setState({ fileList })
    };
    render() {
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action="/file/upload"
                    accept="image/*"
                    name="image"
                    listType="picture-card"
                    fileList={this.state.fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {this.state.fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                </Modal>
            </div>
        );
    }
}

export default Avatar;