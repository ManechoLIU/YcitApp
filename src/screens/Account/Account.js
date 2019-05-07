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
      nick_name: '',
      head_pic: '',
      particle: '',
      leadership: ''
    }
  }

  

  render() {
    return (
      <ScrollView style={styles.me}>
        <View style={styles.meAbove}>
          <ImageBackground style={styles.bgImage} source={require('../../assets/wd-bj.png')} >
            <View style={styles.user}>
              <Text style={styles.userName}>{this.state.nick_name}</Text>
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('Home')
              }}>
                <View style={styles.faceLevel}>
                  <Image style={styles.userFace} source={require('../../assets/wd-tx.png')} />
                  <Image style={styles.level} source={require('../../assets/wd-icon-vip.png')} />
                </View>
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
                  <Text style={styles.grain}>粒子数</Text>
                  <Text style={styles.grain} >{this.state.particle ? this.state.particle : '100'}</Text>
                </View>
                <View style={styles.num}>
                  <Text style={styles.charm}>魅力值</Text>
                  <Text style={styles.grain}>{this.state.leadership ? this.state.leadership : '100'}</Text>
                </View>
              </View>
            </View>
          </ImageBackground>

        </View>

        <View style={styles.meBelow}>

          <View style={styles.iconBar}>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('Like')
            }}>
              <View style={styles.iconItem}>
                <Image style={styles.icons} source={require('../../assets/wd-icon-dz.png')} />
                <Text style={styles.icontext}>点赞</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('Message')
            }}>
              <View style={styles.iconItem}>
                <Image style={styles.icons} source={require('../../assets/wd-icon-ly.png')} />
                <Text style={styles.icontext}>评论</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('Pay')
            }}>
              <View style={styles.iconItem}>
                <Image style={styles.icons} source={require('../../assets/wd-icon-ds.png')} />
                <Text style={styles.icontext}>打赏</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('Notice')
            }}>
              <View style={styles.iconItem}>
                <Image style={styles.icons} source={require('../../assets/wd-icon-tz.png')} />
                <Text style={styles.icontext}>通知</Text>
              </View>
            </TouchableOpacity>

          </View>
          <View style={styles.contentBar}>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('MyContent',{user_id: id})
            }}>
              <View style={styles.contentItem}>
                <Text style={styles.content}>我的内容</Text>
                <Image style={styles.right} source={require('../../assets/wd-icon-it.png')} />

              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              API.toastLong('功能仍在开发中……尽情期待～')
            }}>
              <View style={styles.contentItem}>
                <Text style={styles.content}>我的收藏</Text>
                <Image style={styles.right} source={require('../../assets/wd-icon-it.png')} />

              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('InviteCode')
            }}>
              <View style={styles.contentItem}>
                <Text style={styles.content}>邀请码</Text>
                <Image style={styles.right} source={require('../../assets/wd-icon-it.png')} />

              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('Confirm')
            }}>
              <View style={styles.contentItem}>
                <Text style={styles.content}>认证</Text>
                <Image style={styles.right} source={require('../../assets/wd-icon-it.png')} />

              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('Setting')
            }}>
              <View style={styles.setItem}>
                <Text style={styles.content}>设置</Text>
                <Image style={styles.right} source={require('../../assets/wd-icon-it.png')} />

              </View>
            </TouchableOpacity>

          </View>

        </View>
      </ScrollView>

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
    marginTop: -10
  },
  num: {
    flexDirection: 'column',
    width: util.width/2,
    alignItems: 'center',
    justifyContent: 'center',

  },

  user: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
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
    marginTop: -25,
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
    height: util.height/3,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 17,
    marginTop: 15,
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
    height: 11
  }
})
// const mapStateToProps=state=>({
//   particleNum:state.particleNum
// });
// const mapDispatchToProps=dispatch=>({
//     getParticle: sum=>dispatch(actions.getParticle(sum))
// });
// export default connect(mapStateToProps,mapDispatchToProps)(Me);

