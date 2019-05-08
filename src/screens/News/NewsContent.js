import React, {Component} from 'react'
import {
  Text, FlatList, View, Image, StyleSheet, ScrollView, ImageBackground,
  TextInput, TouchableOpacity, DeviceEventEmitter, Modal, Clipboard, TouchableWithoutFeedback
} from 'react-native'
import util from "../../static/util"
import API from '../../static/methods'


// 图片详情
export default class NewsContent extends React.Component {
  // static defaultProps={
  //   isClick:false

  // }

  constructor(props) {
    // storage.load({
    //   key: 'moment_id'
    // }).then(res => {
    //   moment_id = res
    // })
    storage.load({
      key: 'token',
      id: '2',
    }).then(res => {
      token = res
      console.log(res)
    })
    super(props);
    this.state = {
      moment_id: '',
      content: '',
      contentList: [],
      commentList: [],
      like: require('../../assets/like.png'),
      unlike: require('../../assets/unlike.png'),
      remark: require('../../assets/remark.png'),
      unremark: require('../../assets/unremark.png'),
      collect: require('../../assets/collect.png'),
      uncollect: require('../../assets/uncollect.png'),
      isLike: false,
      isRemark: false,
      isCollect: false,
      isFollowing: true,

      writer_pic: '',
      writer_name: '',
      content_pics: [],
      time: '',
      writer_id: '',

      like_num: 0,
      comment_num: 0,
      favorite_num: 0,

      payValue: 0,
      payVisible: false,
      finishedPay: false,

      modalVisible: false,

    };
  }

  createEmptyView() {
    return (
      <View style={styles.remark}>
        <Image style={styles.userFace} source={require('../../assets/userFace.png')} />
        <TouchableOpacity onPress={this.itemClick.bind(this)} >
          <View style={styles.remarkContent}>
            <View style={styles.userTime}>
              <Text style={styles.remarkUser}>用户名</Text>
              <Text style={styles.remarkTime}>23:55</Text>
            </View>
            <Text style={styles.remarkContent}>好美好美</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  itemClick() {
    // this.props.navigation.navigate('CommentContent')
  }

  renderItem = (item, index) => {
    if (!this.state.isRemark && item.user_id === id) {
      this.setState({
        isRemark: true
      })
    }
    return (
      <View style={styles.remark}>
        <Image style={styles.userFace} source={require('../../assets/userFace.png')}/>
        <TouchableOpacity onPress={this.itemClick.bind(this)}>
          <View style={styles.remarkContent}>
            <View style={styles.userTime}>
              <Text style={styles.remarkUser}>{item.user_name}</Text>
              <Text style={styles.remarkTime}>{item.timestamp.substring(5, 16)}</Text>
            </View>
            <Text style={styles.remarkContent}>{item.content}</Text>
            <View style={{
              paddingBottom: 15,
              borderBottomColor: '#E8E7E7',
              borderBottomWidth: 1
            }}/>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  renderSwiper() {

    let content_pics = this.state.content_pics;
    let imgList = [];
    content_pics.map((img)=> {imgList.push({url: img.image_path})})

    let image = content_pics[0]
    if (content_pics.length === 1 ) {
      return (
        <TouchableOpacity
        onPress={()=>{
          this.props.navigation.navigate('ViewPics', {
            imageUrls: imgList,
          })}}>
        <Image style={styles.contentImage} source={{uri: image.image_path}}/>
        </TouchableOpacity>
      )
    }

   
    // console.error(content_pics)
    var items = []
    for(var i=content_pics.length-1;i>=0;i--) {
      let image = content_pics[i]
      items.push(<View key={i} style={styles.contentImage}>
      
        <TouchableOpacity
        onPress={()=>{
          this.props.navigation.navigate('ViewPics', {
            imageUrls: imgList,
          })}}>
        <Image style={styles.contentImage} source={{uri: image.image_path}}/>
        </TouchableOpacity>
      </View>)
    }
    
    return (
      <Swiper
                height={util.height*2.8/10}
                width={util.width-40}
                showsButtons
                showsPagination={false}
                >
                  {items}
               </Swiper>
    )

  }

  render() {
    return (
      <View style={{flex: 1}}> 
      <KeyboardAwareScrollView style={styles.imageList}>

        {
          this.state.payVisible ?
            <ImageBackground source={require('../../assets/ds-dt.png')}
                             style={[styles.dsModal]}>
              <TouchableOpacity onPress={() => this.setState({payVisible: false})}
                                style={{position: 'absolute', right: 10, top: 10,}}>
                <Image source={require('../../assets/icon-no.png')}
                       style={{width: 30, height: 30}}
                />
              </TouchableOpacity>
              <TextInput defaultValue={this.state.payValue.toString()}
                         onChangeText={(value) => this.setState({payValue: value})}
                         keyboardType={'phone-pad'}
                         style={{fontSize: 50, color: '#fff', marginTop: 40}}
              />
              <Text style={{color: '#FFFFFF', fontSize: 18}}>输入粒子数</Text>
              <TouchableOpacity onPress={() => this.fetchDonate()}>
                <Image source={require('../../assets/ds-btn.png')}
                       style={{width: util.width * 2 / 3 - 100, height: 35, marginTop: 40}}/>
              </TouchableOpacity>
            </ImageBackground> : null
        }

        <View style={this.state.payVisible ? styles.imageAboveAbsolute : styles.imageAbove}>
          <View style={styles.userList}>
            <View style={styles.user}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('UserInfo', {user_id: this.state.writer_id})}>
                <Image style={styles.userFace} source={{uri: this.state.writer_pic}}/>
              </TouchableOpacity>
              <Text style={styles.userName}>{this.state.writer_name}</Text>
            </View>
            {/* <Button containerStyle={styles.follow} >
              <Text style={{ fontSize: 12, color: '#FD295C' }}>取消关注</Text>

            </Button> */}

            {
              this.state.writer_id !== id ?
                <TouchableOpacity
                  style={{position: 'absolute', right: 20}}
                  onPress={() => this.setState({isFollowing: !this.state.isFollowing})}>
                  {/* <ImageBackground
                    source={this.state.isFollowing ?
                      require('../../assets/focus.png') :
                      require('../../assets/unfocus.png')}
                    style={styles.optionButton}>
                    {
                      this.state.isFollowing ?
                        <Text style={{color: '#fff', fontSize: 13}}>关注</Text> :
                        <Text style={{color: '#FD295C', fontSize: 13}}>取消关注</Text>
                    }
                  </ImageBackground> */}


                </TouchableOpacity> : null
            }
          </View>

          <View style={styles.content}>
              <View style={{height: util.height*2.8/10}}> 
              {this.renderSwiper()}
              </View>

            <Text style={styles.contentText}>{this.state.time}</Text>
            <View style={{
              paddingBottom: 0,
              borderBottomColor: '#E8E7E7',
              borderBottomWidth: 0.6
            }}></View>
          </View>
          <View style={{width: util.width, alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => this.setState({
              payVisible: true
            })}>
              <Image style={{marginTop: 10, width: 42, height: 42}}
                     source={this.state.contentList.has_donated || this.state.finishedPay ?
                       require('../../assets/pay.png') :
                       require('../../assets/unpay.png')}/>

            </TouchableOpacity>
          </View>
          <View style={styles.icons}>
            <View style={styles.iconText}>
              <TouchableOpacity
                onPress={() => {
                  this.fetchLike(),
                    this.setState({
                      isClick: !this.state.isClick
                    })
                }}>
                <Image style={styles.icon} source={this.state.isClick ? this.state.like : this.state.unlike}/>
              </TouchableOpacity>
              <Text style={styles.text}>{this.state.like_num}</Text>
            </View>

            <View style={styles.iconText}>
              <TouchableOpacity
              >
                <Image style={styles.icon} source={this.state.isRemark ? this.state.remark : this.state.unremark}/>
              </TouchableOpacity>
              <Text style={styles.text}>{this.state.comment_num}</Text>
            </View>
            <View style={styles.iconText}>
              <TouchableOpacity
                onPress={() => {
                  this.fetchCollect(),
                    this.setState({isCollect: !this.state.isCollect})
                }}>
                <Image style={styles.icon} source={this.state.isCollect ? this.state.collect : this.state.uncollect}/>
              </TouchableOpacity>
              <Text style={styles.text}>{this.state.favorite_num}</Text>
            </View>

          </View>
        </View>

        <View style={styles.imageBelow}>
          <View style={styles.remarkList}>
            <FlatList
              data={this.state.commentList}
              ListEmptyComponent={this.createEmptyView()}
              renderItem={({item, index}) => this.renderItem(item, index)}
              style={styles.flatList}/>
          </View>

        

          <Modal
            visible={this.state.modalVisible}
            animationType={"slide"}
            onRequestClose={() => {
            }}
            transparent={true}>
            <TouchableWithoutFeedback onPress={() => this.setState({modalVisible: false})}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  backgroundColor: 'rgba(0,0,0,.5)'
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 15,
                    backgroundColor: '#ddd'
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      marginRight: 15
                    }}>
                    <TouchableOpacity
                      onPress={() => this.shareToSession()}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 60,
                        height: 60,
                        borderRadius: 8,
                        backgroundColor: '#FFFFFF'
                      }}>
                      <Image
                        style={{
                          width: 33,
                          height: 28
                        }}
                        source={require('../../assets/wx.png')}/>
                    </TouchableOpacity>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 12,
                        color: '#303135'
                      }}>微信好友</Text>
                  </View>

                  <View
                    style={{
                      alignItems: 'center',
                      marginRight: 15
                    }}>
                    <TouchableOpacity
                      onPress={() => this.shareToSessionQQ()}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 60,
                        height: 60,
                        borderRadius: 8,
                        backgroundColor: '#fff'
                      }}>
                      <Image
                        style={{
                          width: 33,
                          height: 33
                        }}
                        source={require('../../assets/qq.png')}/>
                    </TouchableOpacity>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 12,
                        color: '#303135'
                      }}>QQ好友</Text>
                  </View>

                  <View
                    style={{
                      alignItems: 'center',
                      marginRight: 15
                    }}>
                    <TouchableOpacity
                      onPress={() => this.shareToTimeline()}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 60,
                        height: 60,
                        borderRadius: 8,
                        backgroundColor: '#FFFFFF'
                      }}>
                      <Image
                        style={{
                          width: 37,
                          height: 37
                        }}
                        source={require('../../assets/friend.png')}/>
                    </TouchableOpacity>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 12,
                        color: '#303135'
                      }}>朋友圈</Text>
                  </View>

                  <View
                    style={{
                      alignItems: 'center',
                      marginRight: 15
                    }}>
                    <TouchableOpacity
                      onPress={() => this.shareToTimelineQQ()}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 60,
                        height: 60,
                        borderRadius: 8,
                        backgroundColor: '#fff'
                      }}>
                      <Image
                        style={{
                          width: 29,
                          height: 29
                        }}
                        source={require('../../assets/qqSpace.png')}/>
                    </TouchableOpacity>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 12,
                        color: '#303135'
                      }}>QQ空间</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => this.setState({modalVisible: false})}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: API.width,
                    height: 60,
                    backgroundColor: '#FFFFFF'
                  }}>
                  <Text
                    style={{
                      color: '#000'
                    }}>取消</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </KeyboardAwareScrollView>

      <View style={styles.input}>
            <TextInput
              style={styles.publishRemark}
              placeholder={'发表评论'}
              onChangeText={(content) => this.setState({content})}
              value={this.state.content}
            />
            <TouchableOpacity onPress={() => {
              this.Comment()
            }}>
              <ImageBackground source={require('../../assets/massage-fs.png')}
                               style={styles.send}
              >
                <Text style={{fontSize: 13, color: '#fff', textAlign: 'center'}}>发送</Text>

              </ImageBackground>
            </TouchableOpacity>
          </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  imageList: {
    flex: 1,
    flexDirection: 'column',
    
  },
  imageAbove: {
    width: util.width,
    height: util.height * 5.5 / 10,
    flex: 1,
  },
  imageAboveAbsolute: {
    width: util.width / 2,
    height: util.height / 2 + 40,
    flex: 1,
    position: 'absolute',
    top: 0,
    zIndex: 1
  },
  imageBelow: {
    width: util.width,
    height: util.height * 4 / 10,
    flex: 1,
    backgroundColor: '#F7F0F1',
  },
  userList: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    height: util.height / 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  user: {
    position: 'absolute',
    left: 10,
    flexDirection: "row",
    width: util.width * 3 / 4,
    alignItems: 'center',
  },
  userName: {
    fontSize: 16,
    color: '#453E3E',
    marginLeft: 10
  },
  btnContainer: {
    position: 'absolute',
    right: 10,
    top: util.width / 21
  },
  optionButton: {
    height: API.reset(22),
    width: API.reset(62),
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3
  },
  content: {
    flexDirection: 'column',
    marginLeft: 20,
    marginRight: 20,
  },
  contentImage: {
    height: 200,
    overflow: 'hidden'

  },
  contentText: {
    color: '#7D7D7D',
    fontSize: 12,
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'right'
  },

  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: util.width / 2,
    marginTop: 10,
    marginLeft: 3,
    marginBottom: 20
  },
  iconText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: API.reset(25),
    height: API.reset(26),
    marginLeft: 10,
    paddingBottom: 20
  },
  text: {
    color: '#928D8D',
    fontSize: 10,
    marginLeft: 10
  },

  remark: {
    flexDirection: "row",
    paddingTop: 15,


  },
  userFace: {
    marginLeft: 15,
    marginRight: 15,
    width: API.reset(40),
    height: API.reset(40),
    borderRadius: API.reset(20),
  },
  remarkUser: {
    color: '#928D8D',
    fontSize: 12
  },
  remarkTime: {
    color: '#7D7D7D',
    fontSize: 10,
    position: 'absolute',
    right: 0
  },
  remarkList: {
    width: util.width,
    height: util.height / 3.5
  },
  remarkContent: {
    color: '#453E3E',
    fontSize: 15
  },
  userTime: {
    flexDirection: 'row',
    justifyContent: 'flex-start',

    width: util.width * 3 / 4,
  },
  input: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: util.width,
    height: util.height / 25+20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  publishRemark: {
    height: util.height / 25,
    backgroundColor: '#F7F0F1',
    width: util.width * 3 / 4,
    paddingLeft: 10,
    paddingTop: API.reset(5),
    paddingBottom: API.reset(5)
  },
  send: {
    width: API.reset(50),
    height: API.reset(30),
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dsModal: {
    width: util.width * 2 / 3,
    height: util.height / 2,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: util.width / 6,
    marginTop: util.height / 6,
  }

})
