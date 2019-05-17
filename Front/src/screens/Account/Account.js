import React from 'react'
import {
  Text, Navigator, DeviceEventEmitter, ScrollView, View, Image, ImageBackground, StyleSheet, Button,
  TouchableOpacity, AsyncStorage
} from 'react-native'

import util from "../../static/util"
import API from '../../static/methods'



// 我的
export default class Account extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      name: '',
      sno: '',
      sex: '',
      headImg: '',
      birthday: '',
      major: '',
      class: '',
      phone: '',
      email: ''
    }
  }
  componentDidMount() {
    var that = this
    that.GetUserList()
  }
  async GetUserList() {
    var that = this
    util.get('http://192.168.1.106:5002/api/userlist', function (data) {
      console.log(data)
      if (data) {
        that.setState({
          userList: data,
          name: data[0].name,
          sno: data[0].sno,
          sex: data[0].sex,
          headImg: data[0].headImg,
          birthday: data[0].birthday,
          major: data[0].major,
          class: data[0].class,
          phone: data[0].phone,
          email: data[0].email
        })
      } else {
        alert('获取用户列表失败！');
        console.log("shibai")
      }

    }, function (err) {
      alert(err);
      console.log(err)
      alert('服务异常,正在紧急修复,请耐心等待');
    })

  }



  render() {
    return (
      <View>

        <ScrollView style={styles.me}>

          <View style={styles.meAbove}>
            <ImageBackground style={styles.bgImage} source={require('../../assets/wd-bj.png')} >
              <View style={styles.meTop}>
                <TouchableOpacity onPress={() => {
                  this.props.navigation.goBack()
                }}>
                  <Image style={styles.back} source={require('../../assets/grzy-icon.png')} />
                </TouchableOpacity>
                <Text style={styles.topTitle}>个人中心</Text>
                <TouchableOpacity onPress={() => {
                  this.props.navigation.navigate('EditAccount')
                }}>
                  <Image style={styles.headerImage} source={require('../../assets/grzy-icon-bj.png')} />
                </TouchableOpacity>
              </View>
              <View style={styles.user}>
                <Text style={styles.userName}>{this.state.nick_name}</Text>
                <TouchableOpacity onPress={() => {

                }}>
                  <Image style={styles.userFace} source={{ uri: this.state.headImg }} />
                </TouchableOpacity>
                <View style={styles.numBar}>
                  {/*<View style={styles.num}>*/}
                  {/*<Text style={styles.grain}>关注</Text>*/}
                  {/*<Text style={styles.grain}>100</Text>*/}
                  {/*</View>*/}
                  {/*<View style={styles.num}>*/}
                  {/*<Text style={styles.charm}>粉丝</Text>*/}
                  {/*<Text style={styles.grain}>30</Text>*/}
                  {/*</View>*/}
                  <View style={styles.num}>
                    <Text style={styles.grain}>用户名：</Text>
                    <Text style={styles.grain} >{this.state.name}</Text>
                  </View>
                  <View style={styles.num}>
                    <Text style={styles.charm}>学号：</Text>
                    <Text style={styles.grain}>{this.state.sno}</Text>
                  </View>
                </View>
              </View>
            </ImageBackground>

          </View>

          <View style={styles.meBelow}>

            <View style={styles.iconBar}>
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('CourseList')
              }}>
                <View style={styles.iconItem}>
                  <Image style={styles.icons} source={require('../../assets/wd-icon-ds.png')} />
                  <Text style={styles.icontext}>课表</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('GradeList')
              }}>
                <View style={styles.iconItem}>
                  <Image style={styles.icons} source={require('../../assets/wd-icon-dz.png')} />
                  <Text style={styles.icontext}>成绩</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('NewsList')
              }}>
                <View style={styles.iconItem}>
                  <Image style={styles.icons} source={require('../../assets/wd-icon-tz.png')} />
                  <Text style={styles.icontext}>新闻</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('Comment')
              }}>
                <View style={styles.iconItem}>
                  <Image style={styles.icons} source={require('../../assets/wd-icon-ly.png')} />
                  <Text style={styles.icontext}>评论</Text>
                </View>
              </TouchableOpacity>
            </View>
            <Text style={styles.information}>基本资料</Text>
            <View style={styles.contentBar}>
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('MyContent')
              }}>

                <View style={styles.contentItem}>
                  <Text style={styles.content}>姓名</Text>
                  <View style={styles.detail}>
                    <Text style={styles.content}>{this.state.name}</Text>
                    <Image style={styles.right} source={require('../../assets/wd-icon-it.png')} />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                API.toastLong('功能仍在开发中……尽情期待～')
              }}>

              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('MyContent')
              }}>
                <View style={styles.contentItem}>
                  <Text style={styles.content}>性别</Text>
                  <View style={styles.detail}>
                    <Text style={styles.content}>{this.state.sex}</Text>
                    <Image style={styles.right} source={require('../../assets/wd-icon-it.png')} />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('Confirm')
              }}>
                <View style={styles.contentItem}>
                  <Text style={styles.content}>生日</Text>
                  <View style={styles.detail}>
                    <Text style={styles.content}>{this.state.birthday}</Text>
                    <Image style={styles.right} source={require('../../assets/wd-icon-it.png')} />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('Setting')
              }}>
                <View style={styles.contentItem}>
                  <Text style={styles.content}>专业</Text>
                  <View style={styles.detail}>
                    <Text style={styles.content}>{this.state.major}</Text>
                    <Image style={styles.right} source={require('../../assets/wd-icon-it.png')} />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('Setting')
              }}>
                <View style={styles.contentItem}>
                  <Text style={styles.content}>班级</Text>
                  <View style={styles.detail}>
                    <Text style={styles.content}>{this.state.class}</Text>
                    <Image style={styles.right} source={require('../../assets/wd-icon-it.png')} />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('Setting')
              }}>
                <View style={styles.contentItem}>
                  <Text style={styles.content}>手机</Text>
                  <View style={styles.detail}>
                    <Text style={styles.content}>{this.state.phone}</Text>
                    <Image style={styles.right} source={require('../../assets/wd-icon-it.png')} />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('Setting')
              }}>
                <View style={styles.contentItem}>
                  <Text style={styles.content}>邮箱</Text>
                  <View style={styles.detail}>
                    <Text style={styles.content}>{this.state.email}</Text>
                    <Image style={styles.right} source={require('../../assets/wd-icon-it.png')} />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('Setting')
              }}>
                <View style={styles.contentItem}>
                  <Text style={styles.content}>班级</Text>
                  <View style={styles.detail}>
                    <Text style={styles.content}>软件152</Text>
                    <Image style={styles.right} source={require('../../assets/wd-icon-it.png')} />
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('Setting')
              }}>
                <View style={styles.contentItem}>
                  <Text style={styles.content}>班级</Text>
                  <View style={styles.detail}>
                    <Text style={styles.content}>软件152</Text>
                    <Image style={styles.right} source={require('../../assets/wd-icon-it.png')} />
                  </View>
                </View>
              </TouchableOpacity>


            </View>

          </View>
        </ScrollView>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  meAbove: {
    width: util.width,
    height: util.height * 4 / 11
  },
  bgImage: {
    width: util.width,
    height: util.height * 4 / 11

  },
  numBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // marginLeft: 17,
    width: util.width * 11 / 12,
    marginTop: -30
  },
  num: {
    flexDirection: 'row',
    width: util.width / 2,
    alignItems: 'center',
    justifyContent: 'center',

  },

  user: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10
  },
  userName: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 15,

  },
  userFace: {
    width: API.reset(70),
    height: API.reset(70),
    marginBottom: API.reset(40),
    borderRadius: API.reset(35)
  },
  grain: {
    fontSize: 15,
    color: '#FFFEFE',
    // marginRight: 20
  },
  charm: {
    fontSize: 15,
    color: '#FFFEFE'
  },
  meBelow: {
    width: util.width,
    height: util.height * 7 / 11,
    backgroundColor: '#F7F0F1'
  },
  iconBar: {
    width: util.width * 11 / 12,
    height: 95,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 17,
    marginTop: -46,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  iconItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icontext: {
    marginTop: 5,
    fontSize: 12,
    color: '#453E3E'
  },
  contentBar: {
    width: util.width * 11 / 12,
    height: util.height * 2 / 3,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 17,
    marginTop: 10,
    borderRadius: 5,

  },
  contentItem: {
    width: util.width * 7 / 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#C9C0C2',
    borderBottomWidth: 0.3,
    marginBottom: 15,
    paddingBottom: 15,

  },
  setItem: {
    width: util.width * 7 / 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faceLevel: {
    flexDirection: 'row',
  },
  level: {
    marginTop: API.reset(50),
    marginLeft: API.reset(-20),
    width: 28,
    height: 28
  },
  icons: {
    width: API.reset(30),
    height: API.reset(30)
  },
  right: {
    width: 11,
    height: 11,
    marginLeft: 5
  },
  information: {
    marginLeft: 18,
    marginTop: 20
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  meTop: {
    width: util.width * 11 / 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 14,
    marginTop: 18,
    marginBottom: 10
  },
  topTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  back: {
    marginLeft: 5,
    width: 9,
    height: 18
  },
  headerImage: {
    marginLeft: 5,
    width: 23,
    height: 23
  }
})

