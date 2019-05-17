import React from 'react'
import { Text, View, Image, ImageBackground, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import util from "../../static/util"
import VerificationCodeButton from '../../components/VerificationCodeButton'
import API from '../../static/methods'

export default class Register extends React.Component {
  constructor() {
    super()
    this.state = {
      //timothy add
      phone: '',//手机号
      password: '',//密码
      repeatpwd: '',
      sms: '',//验证码

      code: '',//邀请码
      nick_name: '',//昵称
    }
  }

  render() {
    return (
      <View style={styles.me}>
        <ImageBackground style={styles.bgImage} source={require('../../assets/zc-bj.png')} >
          <ScrollView contentContainerStyle={styles.scroll} >
            <Image style={styles.back} source={require('../../assets/grzy-icon.png')} />
            <View style={styles.meTop}>

              <Text style={styles.register}>注册</Text>
            </View>

            <View style={styles.contentBar}>
              <View style={styles.contentItem}>
                <TextInput style={styles.title}
                  placeholder={'请输入手机号'}
                  maxLength={11}
                  value={this.state.phone}
                  onChangeText={(text) => this.setState({ phone: text })}
                ></TextInput>
              </View>
              <View style={styles.contentItem}>
                <TextInput style={styles.title}
                  onChangeText={(text) => this.setState({ password: text })}
                  placeholder='请输入密码'
                  secureTextEntry={true}
                  value={this.state.password}
                ></TextInput>
              </View>
              <View style={styles.contentItem}>
                <TextInput style={styles.title}
                  onChangeText={(text) => this.setState({ repeatpwd: text })}
                  placeholder='请输入密码'
                  secureTextEntry={true}
                  value={this.state.repeatpwd}
                ></TextInput>
              </View>
              <View style={styles.contentItem}>
                <View style={styles.phone}>
                  <TextInput style={styles.title}
                    placeholder='手机验证码'
                    value={this.state.sms}
                    onChangeText={(text) => /^[0-9]*$/.test(text)
                      ? this.setState({ sms: text })
                      : ''}
                    maxLength={6}
                  ></TextInput>
                  <View style={styles.codeBox}>
                    <VerificationCodeButton
                      text='获取验证码'
                    />
                  </View>
                </View>

              </View>
              <View style={styles.contentItem}>
                <TextInput style={styles.title}
                  placeholder='请输入昵称'
                  onChangeText={(text) => this.setState({ nick_name: text })}
                ></TextInput>

              </View>
              <View style={styles.contentItem}>
                <TextInput style={styles.title}
                  placeholder='邀请码（可选填）'
                  onChangeText={(text) => this.setState({ code: text })}
                ></TextInput>
              </View>

              <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                <ImageBackground source={require('../../assets/zc-bt.png')} style={styles.button}>
                  <Text style={styles.next}> 下一步</Text>
                </ImageBackground>
              </TouchableOpacity>


            </View>

          </ScrollView>
        </ImageBackground>


      </View>


    )
  }
}

const styles = StyleSheet.create({
  me: {
    flex: 1,
  },
  // 背景
  bgImage: {
    flex: 1,
    width: util.width,
    height: util.height,
  },
  scroll: {
    width: util.width,
    height: util.height * 11 / 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // 顶部
  meTop: {
    width: util.width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    marginLeft: 14,
    marginTop: 10
  },
  nextView: {
    marginTop: 20,

  },
  register: {
    fontSize: 20,
    color: '#FFFFFF'
  },

  // 注册信息
  contentBar: {
    width: util.width * 11 / 12,
    marginLeft: util.width / 24,
    height: util.height * 7 / 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: API.reset(45),
    marginBottom: API.reset(20),
    borderRadius: 5,
  },
  contentItem: {
    width: util.width * 3 / 4,
    flexDirection: 'column',
    borderBottomColor: '#C9C0C2',
    borderBottomWidth: 0.5,
    marginBottom: 25,


  },
  title: {
    fontSize: 17,
    color: '#655B5E'

  },

  // 手机验证码
  phone: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  codeBox: {
    borderLeftColor: '#7D7D7D',
    borderLeftWidth: 0.5
  },
  code: {
    paddingLeft: 10,
    fontSize: 17,
    color: '#FD0C46'
  },
  button: {
    width: util.width * 3 / 4,
    height: API.reset(50),
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    borderRadius: 10,
  },
  next: {
    color: 'white',
    fontSize: 18,
    margin: 0
  },
  back: {
    position: 'absolute',
    top: 15,
    left: 15,
    width: 9,
    height: 18
  }

})
