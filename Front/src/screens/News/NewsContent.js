import React, {Component} from 'react'
import {
  Text, FlatList, View, Image, StyleSheet, ScrollView, ImageBackground,
  TextInput, TouchableOpacity, DeviceEventEmitter, Modal, Clipboard, TouchableWithoutFeedback
} from 'react-native'

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import Swiper from 'react-native-swiper'
import util from "../../static/util"
import API from '../../static/methods'


// 图片详情
export default class NewsContent extends React.Component {
  render() {
    return (
        <View style={styles.article}>
           <Image style={styles.articleImage} source={{ uri: 'http://jwc.ycit.cn/upload/images/2019/4/18/2.png'}} />
          <Text style={styles.articleContent}>4月9日，教育部办公厅正式发布《关于实施一流本科专业建设“双万计划”的通知》（教高厅函〔2019〕18号），决定启动一流本科专业建设“双万计划”。我校随即做出积极反应， 4月11日，副校长王资生组织教学副院长、副主任召开了申报启动会。4月18日上午，在南校区行政楼9楼会议室，校长方海林亲自召集各教学单位院长、主任及教务处、评估处、设备处、师培中心等职能部门相关人员召开一流本科专业建设“双万计划”申报工作推进会，充分体现了我校对此项工作的高度重视。

会上，教务处副处长吕立斌对“双万计划”进行了详细解读。教务处处长王伟介绍了我校申报工作具体安排。

方海林指出，“双万计划”对我校而言既是挑战也是机遇，由于它是面向各类高校、全部专业的，所以每个学院都要高度重视，把握机会，积极争取。她要求，一是提前谋划，在省教育厅“一流本科专业建设方案”发布前做好各项准备工作；二是各位院长要作为项目第一负责人亲自抓落实，扎实做好基础工作；三是结合自身优势，凸显专业特色；四是注意时间节点，按照建设要求积极组织申报工作。

“双万计划”对我校建设一流本科、建设一流专业、培养一流人才具有重大意义，学校将以此为契机，进一步提高我校人才培养能力，实现高等教育内涵式发展。</Text>
        </View>
    )
}
}
const styles = StyleSheet.create({
  article:{
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  articleImage:{
    width:util.width*6/7,
    height:150,
    marginTop:10
  },
  articleContent:{
    width:util.width*6/7,
    height:400,
    marginTop:10,
    paddingBottom:50,
    marginBottom:10
  }

})