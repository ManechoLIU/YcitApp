import React, { Component } from 'react'
import {
  Text, FlatList, View, Image, StyleSheet, ScrollView, ImageBackground,
  TextInput, TouchableOpacity, DeviceEventEmitter, Modal, Clipboard, TouchableWithoutFeedback
} from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Swiper from 'react-native-swiper'
import util from "../../static/util"
import API from '../../static/methods'

// 图片详情
export default class NewsContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      date: '',
      writer: '',
      icon: '',
      title: '',
      content: ''
    }
  }
  componentDidMount() {
    let _id = this.props.navigation.state.params._id.toString()
    console.log("_id:" + _id)
    this.getIdArticle(_id)
  }

  async getIdArticle(_id) {
    fetch(`http://192.168.43.60:5002/api/newslist/item/${_id}`).then(rep => {
      console.log(rep)
      // console.log(_id)
      return rep.json();
    }).then(json => {
      let data = json.data;
      console.log(json)
      console.log(data)
      let that = this
      that.setState({
        _id: data._id,
        date: data.date,
        writer: data.writer,
        icon: data.icon,
        title: data.title,
        content: data.content
      })
      console.log(title)
    })
  }

  render() {
    return (
      <View style={styles.article}>
        <View style={styles.top}>
          <Text style={styles.writer}>作者：{this.state.writer}</Text>
          <Text style={styles.writer}>时间：{this.state.date}</Text>
        </View>
        <Image style={styles.articleImage} source={{ uri: this.state.icon }} />
        <Text style={styles.title}>{this.state.title}</Text>
        <Text style={styles.articleContent}>{this.state.content}</Text>

      </View>
    )
  }
}
const styles = StyleSheet.create({
  article: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  articleImage: {
    width: util.width * 6 / 7,
    height: 150,
    marginTop: 10
  },
  top: {
    width: util.width * 6 / 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    width: util.width * 6 / 7,
    textAlign:'left',
    paddingTop:10,
    paddingBottom:2
  },
  writer: {
    fontSize: 14,
    // fontWeight: 'bold'
  },
  articleContent: {
    width: util.width * 6 / 7,
    height: 400,
    marginTop: 10,
    paddingBottom: 50,

    marginBottom: 10
  }

})