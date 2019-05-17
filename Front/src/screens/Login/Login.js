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
      mobile: '',
      password: '',
      wechatIconVisible: true,
    }
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
                placeholder='请输入手机号'
                value={this.state.mobile}
                onChangeText={(text) => /^[0-9]*$/.test(text)
                  ? this.setState({ mobile: text })
                  : ''}
              />
            </View>
            <View style={styles.contentItem}>
              <TextInput style={[styles.title, { paddingBottom: 13 }]}
                placeholder='请输入密码'
                value={this.state.password}
                secureTextEntry={true}
                onChangeText={(text) => this.setState({ password: text })}
              />
            </View>
          </View>

          <Button containerStyle={styles.button} onPress={() => this.props.navigation.navigate('Root')}>
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

          {this.state.wechatIconVisible ?
            <View>
              <View style={styles.lineBox}>
                <View style={styles.line} />
                <View style={styles.textBox}>
                  <Text style={styles.loginText}>使用第三方登录</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('WeChat')} style={styles.shareBox}>
                <Image style={styles.shareIcon} source={require('../../assets/dl-icon-wx.png')} />
                {/*<Image style={styles.shareIcon} source={require('../../assets/dl-icon-qq.png')}/>*/}
              </TouchableOpacity></View> : null}
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
