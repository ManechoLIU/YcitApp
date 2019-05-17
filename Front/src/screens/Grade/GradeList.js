import React from 'react'
import {
  Text, View, Image, ImageBackground, StyleSheet, FlatList, Platform,
  Button, ScrollView, TouchableOpacity, Picker, TouchableHighlight, AsyncStorage
} from 'react-native'
import util from "../../static/util"
import API from "../../static/methods"
// 个人主页

export default class GradeList extends React.Component {
  constructor() {
    super()
    this.state = {
      gradeList: [],
    }
  }
  componentDidMount() {
    var that = this
    that.GetArticleList()
  }
  async GetArticleList() {
    var that = this
    util.get('http://192.168.1.106:5002/api/gradelist', function (data) {
      console.log(data)
      if (data) {
        console.log(data)
        that.setState({
          gradeList: data
        })
      } else {
        alert('获取成绩列表失败！');
        console.log("shibai")
      }

    }, function (err) {
      alert(err);
      console.log(err)
      alert('服务异常,正在紧急修复,请耐心等待');
    })

  }


  _onTopRefresh = () => {
    this.GetArticleList()
  }
  _onEndReached = () => {
    if (!this.onEndReachedCallDuringMomentum) {
      this.GetArticleList();
      this.onEndReachedCallDuringMomentum = true
    }

  }
  createEmptyView() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('NewsContent')} >
          <View style={styles.contentItem}>
            <Text style={styles.title}>操作系统</Text>
            <Text style={styles.content}>67.0</Text>
          </View>
        </TouchableOpacity>

      </View>

    );
  }
  itemClick() {
    this.props.navigation.navigate('GradeContent')
  }
  renderItem = (item, index) => {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('GradeContent')} >
        <View style={styles.contentItem}>
          <Text style={styles.title}>{item.course}</Text>
          <Text style={styles.content}>{item.mark}</Text>
        </View>
      </TouchableOpacity>

    )
  }

  render() {
    return (
      <View style={styles.me}>
        <ImageBackground source={require('../../assets/me_background.png')}
          style={[styles.bgImage, { opacity: 0.9 }]} />
        <View style={{ position: 'absolute', top: Platform.OS === 'android' ? 0 : 20 }}>
          <View style={styles.meTop}>
            <TouchableOpacity onPress={() => {
              this.props.navigation.goBack()
            }}>
              <Image style={styles.back} source={require('../../assets/grzy-icon.png')} />
            </TouchableOpacity>
            <Text style={styles.topTitle}>成绩查询</Text>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('Account')
            }}>
              <Image style={styles.headerImage} source={require('../../assets/wd-tx.png')} />
            </TouchableOpacity>
          </View>

          <View style={styles.contentBar}>
            <ScrollView>
              <View style={styles.filed}>
                <Text style={styles.course}>课程名称</Text>
                <Text style={styles.grade}>成绩</Text>
              </View>
              <FlatList
                    data={this.state.gradeList}
                    // onBeginRefresh={this._onTopRefresh}
                    onEndReached={this._onEndReached}
                    onEndReachedThreshold={0.2}
                    onMomentumScrollBegin={() => {
                        this.onEndReachedCallDuringMomentum = false
                    }}
                    ListEmptyComponent={this.createEmptyView()}
                    renderItem={({ item, index }) => this.renderItem(item, index)}
                    contentContainerStyle={styles.flatList} />
              {/* <View style={styles.contentItem}>
                <Text style={styles.title}>操作系统</Text>
                <Text style={styles.content}>{this.state.university ? this.state.university : '67.0'}</Text>
              </View>
              <View style={styles.contentItem}>
                <Text style={styles.title}>算法与数据结构</Text>
                <Text style={styles.content}>{this.state.birthday ? this.state.birthday : '67.0'}</Text>

              </View>
              <View style={styles.contentItem}>
                <Text style={styles.title}>数据库原理及应用</Text>
                <Text style={styles.content}>{this.state.mobile ? this.state.mobile : '68.0'}</Text>

              </View>
              <View style={styles.contentItem}>
                <Text style={styles.title}>软件设计</Text>
                <Text style={styles.content}>{this.state.name ? this.state.name : '66.0'}</Text>

              </View>
              <View style={styles.contentItem}>
                <Text style={styles.title}>计算机组成原理与体系结构</Text>
                <Text style={styles.content}>{this.state.IDcard ? this.state.IDcard : '76.0'}</Text>

              </View>
              <View style={styles.contentItem}>
                <Text style={styles.title}>Java语言与面向对象技术</Text>
                <Text style={styles.content}>{this.state.university ? this.state.university : '87.0'}</Text>
              </View>
              <View style={styles.contentItem}>
                <Text style={styles.title}>人机交互技术</Text>
                <Text style={styles.content}>{this.state.birthday ? this.state.birthday : '69.0'}</Text>

              </View>
              <View style={styles.contentItem}>
                <Text style={styles.title}>软件工程经济学</Text>
                <Text style={styles.content}>{this.state.mobile ? this.state.mobile : '87.0'}</Text>

              </View>
              <View style={styles.contentItem}>
                <Text style={styles.title}>JavaEE技术	</Text>
                <Text style={styles.content}>{this.state.name ? this.state.name : '90.0'}</Text>

              </View>
              <View style={styles.contentItem}>
                <Text style={styles.title}>ASP.NET编程</Text>
                <Text style={styles.content}>{this.state.IDcard ? this.state.IDcard : '88.0'}</Text>

              </View> */}

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
    marginBottom: 10
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
    // height: util.height * 4 / 5 - 35,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 17,
    borderRadius: 5,

  },
  course: {
    color: '#6E97F6',
    fontWeight: 'bold'
  },
  grade: {
    color: '#6E97F6',
    fontWeight: 'bold'
  },
  filed: {
    width: util.width * 7 / 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#C9C0C2',
    borderBottomWidth: 0.3,
    marginBottom: 13,
    marginTop: 8,
    paddingBottom: 13,
  },
  contentItem: {
    width: util.width * 7 / 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontSize: 14,
    color: '#15B485',

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
  headerImage: {
    marginLeft: 5,
    width: 40,
    height: 40
  }

})
