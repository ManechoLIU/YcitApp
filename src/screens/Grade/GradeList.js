import React from 'react'
import {
  Text, View, Image, ImageBackground, StyleSheet, TextInput, Platform,
  Button, ScrollView, TouchableOpacity, Picker, TouchableHighlight, AsyncStorage
} from 'react-native'
import util from "../../static/util"
import API from "../../static/methods"
// 个人主页

export default class GradeList extends React.Component {
  constructor() {
    super()
    this.state = {
      mobile: '',
      password: '',
      university: '',
      gender: '',
      name: '',
      IDcard: '',
      birthday: '',
      headPic: '',
      token: '',
      nickname: '',
      id: 1
    }
  }


  render() {
    return (
      <View style={styles.me}>
        <ImageBackground style={styles.bgImage} source={{uri: this.state.headPic}}>
          <ImageBackground source={require('../../assets/me_background.png')}
                           style={[styles.bgImage, {opacity: 0.9}]}
          />
        </ImageBackground>

        <View style={{position: 'absolute', top: Platform.OS === 'android' ? 0 : 20}}>
          <View style={styles.meTop}>
            <TouchableOpacity onPress={() => {
              this.props.navigation.goBack()
            }}>
              <Image style={styles.back} source={require('../../assets/grzy-icon.png')}/>
            </TouchableOpacity>
            <Text style={styles.topTitle}>成绩</Text>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('Edit')
            }}>
              <Image style={styles.editImage} source={require('../../assets/grzy-icon-bj.png')}/>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.user}>
            <View style={styles.faceLevel}>
              <Image style={styles.userFace} source={require('../../assets/wd-tx.png')}/>
              <Image style={styles.level_vip} source={require('../../assets/wd-icon-vip.png')}/>
            </View>
            <View style={styles.levelBar}>
              <Text style={styles.userName}>{this.state.nickname ? this.state.nickname : '用户名'}

              </Text>
              <Image style={styles.level} source={require('../../assets/icon-women.png')}/>


            </View>
            <View style={styles.labelList}>
              <Text style={styles.label}>{this.state.hobby}</Text>

            </View>
          </View> */}
          
          <View style={styles.contentBar}>
          <ScrollView>
            <View style={styles.contentItem}>
              <Text style={styles.title}>大学</Text>
              <Text style={styles.content}>{this.state.university ? this.state.university : '未填写'}</Text>
            </View>
            <View style={styles.contentItem}>
              <Text style={styles.title}>生日</Text>
              <Text style={styles.content}>{this.state.birthday ? this.state.birthday : '未填写'}</Text>

            </View>
            <View style={styles.contentItem}>
              <Text style={styles.title}>手机号</Text>
              <Text style={styles.content}>{this.state.mobile ? this.state.mobile : '未填写'}</Text>

            </View>
            <View style={styles.contentItem}>
              <Text style={styles.title}>姓名</Text>
              <Text style={styles.content}>{this.state.name ? this.state.name : '未填写'}</Text>

            </View>
            <View style={styles.idCard}>
              <Text style={styles.title}>身份证号</Text>
              <Text style={styles.content}>{this.state.IDcard ? this.state.IDcard : '未填写'}</Text>

            </View>
           
            </ScrollView>

          </View>
          
        </View>
       

      </View>


    )
  }
}

const styles = StyleSheet.create({
    me: {
      flex: 1
    },
    bgImage: {
      // width: util.width,
      // height: util.height,
      flex: 1
    },
    meTop: {
      width: util.width * 11 / 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginLeft: 14,
      marginTop: 18,
      marginBottom: 15
    },
    topTitle: {
      fontWeight: 'bold',
      fontSize: 20,
      color: '#FFFFFF',
      textAlign: 'center',
    },
    labelList: {
      flexDirection: 'row',
  
    },
  
    user: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    userName: {
      fontSize: 17,
      color: '#FFFFFF',
  
  
    },
    userFace: {
      width: API.reset(70),
      height: API.reset(70),
      marginBottom: API.reset(15),
      borderRadius: API.reset(35),
      paddingLeft: API.reset(50)
    },
    level: {
      position: 'absolute',
      right: API.reset(-20),
      paddingLeft: API.reset(10)
    },
    level_vip: {
      marginTop: API.reset(50),
      marginLeft: API.reset(-25),
      width: API.reset(25),
      height: API.reset(25)
    },
    faceLevel: {
      flexDirection: 'row',
    },
    label: {
      fontSize: 12,
      color: '#FFFDFD'
    },
  
    contentBar: {
      width: util.width * 11 / 12,
      height: util.height * 3 / 5,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 17,
      marginTop: 15,
      borderRadius: 5,
  
    },
    contentItem: {
      width: util.width * 7 / 9,
      flexDirection: 'column',
  
  
      borderBottomColor: '#C9C0C2',
      borderBottomWidth: 0.3,
      marginBottom: 13,
      paddingBottom: 13,
  
    },
    title: {
      fontSize: 14,
      color: '#7D7D7D'
  
    },
    content: {
      fontSize: 18,
      color: '#453E3E',
      marginTop: 6
    },
    idCard: {
      width: util.width * 7 / 9,
      flexDirection: 'column',
    },
    levelBar: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 5,
    },
    back: {
      marginLeft: 5,
      width: 9,
      height: 18
    },
    editImage: {
      marginLeft: 5,
      width: 16,
      height: 17
    }
  
  })
  