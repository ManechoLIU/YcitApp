import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
} from 'react-native';
import Dimensions from 'Dimensions';
const { width, height } = Dimensions.get('window');
// import ImagePicker from 'react-native-image-picker';
import ImageCropPicker from "react-native-image-crop-picker";
let pickPhotoOptions = {
  title: '选择头像',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '从相册...',
  quality: 0.8,
  allowsEditing: true,
  noData: false,
  image: null,
  images: null,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  },

};
var testImage=''
export default class Photo extends React.Component {

  state = {
    avatarSource: null,
    // videoSource: null
  };

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };
    ImageCropPicker.openCamera({
      cropping: true,
      width: 500,
      height: 500,
      includeExif: true,
    }).then(image => {
      console.log('received image', image);
      this.setState({
        image: {
          uri: image.path,
          width: image.width,
          height: image.height
        },
        images: null,
        testImage: image.path,

      });
      console.log(this.state.testImage + '00000')
      this.props._setImage(this.state.testImage)
     
    }).catch(e => alert(e));
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.avatarSource === null ? <TouchableOpacity
          style={styles.btn}
          onPress={this.selectPhotoTapped.bind(this)}>
          <Text style={styles.btnText}>拍照</Text>
        </TouchableOpacity> : <TouchableOpacity
          style={styles.avatar}
          onPress={() => { this.selectPhotoTapped.bind(this) }}>
            <Image style={styles.avatar} source={this.state.testImage} />
          </TouchableOpacity>

        }
        {/* <TouchableOpacity
            style={styles.btn}
            onPress={this.selectPhotoTapped.bind(this)}>  
                <Text style={styles.btnText}>拍照</Text>
        </TouchableOpacity>
        <Image style={styles.avatar} source={this.state.avatarSource} />

        <TouchableOpacity onPress={this.selectVideoTapped.bind(this)}>
          <View style={[styles.avatar, styles.avatarContainer]}>
            <Text>Select a Video</Text>
          </View>
        </TouchableOpacity>

        { this.state.videoSource &&
          <Text style={{margin: 8, textAlign: 'center'}}>{this.state.videoSource}</Text>
        } */}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF'
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    // borderRadius: 75,
    // marginTop:20,
    width: 50,
    height: 50
  },
  btn: {
    marginTop: 20,
    width: width * 0.9,
    // marginLeft:width*0.05,
    backgroundColor: '#FF0042',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#fff',
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  },
});
