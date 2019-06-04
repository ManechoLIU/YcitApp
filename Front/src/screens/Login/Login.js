import React from 'react'
import {
  Text, View, Image, ImageBackground, TextInput, StyleSheet, AsyncStorage,
  ScrollView, TouchableOpacity, Platform, DeviceEventEmitter, Linking
} from 'react-native'
import util from "../../static/util"
import Button from 'react-native-button'
import API from '../../static/methods'

export default class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      sno: '',
      pwd: '',
      _id: '',
      wechatIconVisible: true,
    }
  }
  async Login() {
    fetch('http://192.168.43.60:5002/api/userlist/find', {
      method: 'POST',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // id: "5ce011c465a9428c7fbff198",
        sno: this.state.sno,
        pwd: this.state.pwd
      })
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res)
        console.log(res.data)
        console.log(res.data.gradelist)
        if (res.status === 2) {
          if (res.data.sno == this.state.sno && res.data.pwd == this.state.pwd) {
            console.log(res.data.sno)

            AsyncStorage.setItem('id', res.data._id)
            global.id = res.data._id,
              global.headImg = res.data.headImg,
              global.gradelist = res.data.gradelist,
              
            storage.save({
              key: 'userlist',
              id: '1',
              data: {
                username: res.data.username,
                name: res.data.name,
                sno: res.data.sno,
                sex: res.data.sex,
                headImg: res.data.headImg,
                birthday: res.data.birthday,
                major: res.data.major,
                classes: res.data.classes,
                phone: res.data.phone,
                email: res.data.email,
                gradelist: res.data.gradelist
              }

            })
            console.log(res.data.gradelist)
            this.props.navigation.navigate('Root')
          } else {

            API.toastLong('学号或密码输入错误')
          }

        } else if (res.status === 1) {
          API.toastLong('学号或密码输入错误')
        } else {
          API.toastLong('学号或密码输入错误')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  render() {
    return (
      <View style={styles.me}>
        <ImageBackground style={styles.bgImage} source={require('../../assets/dl-bj.png')}>
          <View style={styles.meTop}>

            <Text style={styles.login}>登录</Text>
          </View>

          <View style={styles.contentBar}>
            <View style={styles.contentItem}>
              <TextInput style={[styles.title, { paddingBottom: 13 }]}
                maxLength={11}
                keyboardType={'phone-pad'}
                placeholder='请输入学号'
                value={this.state.sno}
                onChangeText={(text) => /^[0-9]*$/.test(text)
                  ? this.setState({ sno: text })
                  : ''}
              />
            </View>
            <View style={styles.contentItem}>
              <TextInput style={[styles.title, { paddingBottom: 13 }]}
                placeholder='请输入密码'
                value={this.state.pwd}
                secureTextEntry={true}
                onChangeText={(text) => this.setState({ pwd: text })}
              />
            </View>
          </View>

          <Button containerStyle={styles.button} onPress={() => this.Login()}>
            <Text style={styles.login}> 登录</Text>
          </Button>
          <View style={styles.textBar}>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('Register')
            }}>
              <Text style={styles.quick}>快速注册</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('ForgetPassword')
            }}>
              <Text style={styles.quick}>忘记密码</Text>
            </TouchableOpacity>
          </View>

          {/* {this.state.wechatIconVisible ?
            <View>
              <View style={styles.lineBox}>
                <View style={styles.line} />
                <View style={styles.textBox}>
                  <Text style={styles.loginText}>使用第三方登录</Text>
                </View>
              </View> */}
          {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('WeChat')} style={styles.shareBox}>
                <Image style={styles.shareIcon} source={require('../../assets/dl-icon-wx.png')} /> */}
          {/*<Image style={styles.shareIcon} source={require('../../assets/dl-icon-qq.png')}/>*/}
          {/* </TouchableOpacity></View> : null} */}
        </ImageBackground>


      </View>


    )
  }
}

const styles = StyleSheet.create({
  me: {
    flex: 1
  },
  // 背景
  bgImage: {
    flex: 1,
    justifyContent: 'center',
  },
  // 顶部
  meTop: {
    width: util.width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    marginTop: Platform.OS === 'android' ? 10 : 40
  },
  login: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  // 注册信息
  contentBar: {
    width: util.width * 11 / 12,
    height: 200,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 24,
    marginLeft: 17,
    // marginTop: Platform.OS === 'android' ? 180 : 150,
    borderRadius: 5,

  },
  contentItem: {
    width: util.width * 3 / 4,
    flexDirection: 'column',
    borderBottomColor: '#C9C0C2',
    borderBottomWidth: 0.5,
    marginBottom: 35,


  },
  title: {
    fontSize: 17,
    color: '#655B5E'

  },
  // 按钮
  button: {
    backgroundColor: '#FF0042',
    width: util.width * 3 / 4,
    height: 55,
    color: 'white',
    paddingTop: 15,
    marginLeft: 52,
    borderRadius: 10
  },
  textBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: util.width * 3 / 4,
    marginLeft: 52,
    marginTop: 4
  },
  quick: {
    fontSize: 12,
    color: '#FD0C46'
  },
  // 线
  lineBox: {
    marginTop: 45,
    alignItems: 'center'
  },
  line: {
    height: 0.5,
    width: util.width * 3 / 4 - 7,
    backgroundColor: '#BCB8B9',
    marginBottom: -8

  },
  loginText: {
    fontSize: 12,
    color: '#C3C0C1',
    paddingLeft: 7,
    paddingRight: 7
  },
  textBox: {
    backgroundColor: '#FFFF',
    height: 25,
  },
  // 分享
  shareBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: util.width / 3 + 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    width: util.width
  },
  shareIcon: {
    width: 36,
    height: 36,
    marginLeft: 20,
    marginRight: 20
  }

})
