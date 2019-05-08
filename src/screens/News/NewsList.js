import React from 'react'
import {
    Text, FlatList, ActivityIndicator, View, Image, StyleSheet, DeviceEventEmitter,
    Button, ScrollView, TouchableOpacity
} from 'react-native'
import Util from "../../static/util"
import API from '../../static/methods'
// 文章列表页面
export default class NewsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articleList: [],
            isLoading: false,
            page: 1,
            moment_id: -1,
            dataLength: 10,
            imagesLength: 1,
            lastmoment_id: -1
        }
    }
    async GetArticleList() {
        let formData = new FormData()
        formData.append('user_id', id)
        console.log("lastmoment_id:")
        console.log(this.state.lastmoment_id)
        formData.append('moment_id', this.state.lastmoment_id)
        formData.append('moment_num', 10)
        try {
            let response = await API._fetch(API.post({ url: 'Api/Moment/getMomentViewListBefore', formData }))
            let responseJson = await response.json()

            if (responseJson.info) {
                const dataLength = responseJson.data.length;
                this.setState({
                    lastmoment_id: responseJson.data[dataLength - 1].id,
                    articleList: this.state.articleList.concat(responseJson.data)
                })

                // API.toastLong('获取文章成功')
            }
        } catch (error) {
            // API.toastLong('获取文章失败')
        }
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
                <View style={styles.box}>
                    <View style={styles.dateImage}>
                        <Image style={styles.articleImage} source={{ uri: 'http://jwc.ycit.cn/upload/images/2019/4/18/2.png' }} />
                        <Text style={styles.date}>2019-04-09</Text>
                    </View>
                    <View style={styles.artcileText}>
                        <Text numberOfLines={1} style={styles.artcileTitle}>挑战与机遇并存——我校积极推进一流本科专业建设“双万计划”申报工作</Text>
                        <Text numberOfLines={2} style={styles.artcileContent}>4月9日，教育部办公厅正式发布《关于实施一流本科专业建设“双万计划”的通知》（教高厅函〔2019〕18号），决定启动一流本科专业建设“双万计划”。我校随即做出积极反应， 4月11日，副校长王资生组织教学副院长、副主任召开了申报启动会。4月18日上午，在南校区行政楼9楼会议室，校长方海林亲自召集各教学单位院长</Text>
                    </View>
                </View>
                </TouchableOpacity>
                <View style={styles.box}>
                    <View>
                        <Image style={styles.articleImage} source={{ uri: 'http://jwc.ycit.cn/upload/images/2019/4/12/1.png' }} />
                        <Text style={styles.date}>2019-04-11</Text>
                    </View>
                    <View style={styles.artcileText}>
                        <Text numberOfLines={1} style={styles.artcileTitle}>我校启动一流本科专业建设“双万计划”申报工作</Text>
                        <Text numberOfLines={2} style={styles.artcileContent}>4月11日下午，在行政楼9楼会议室，我校召开一流本科专业建设“双万计划”申报启动会，各教学院部负责教学工作的副院长（副主任）及教务处、评估处等职能部门相关人员参加。副校长王资生出席。教务处处长王伟主持。会议传达了《教育部办公厅关于实施一流本科专业建设“双万计划”的通知》（教高厅函〔2019〕18号）精神，教务处副处长吕立斌从主要任务、建设原则、建设</Text>
                    </View>

                </View>
                <View style={styles.box}>
                    <View style={styles.dateImage}>
                        <Image style={styles.articleImage} source={{ uri: 'http://jwc.ycit.cn/upload/images/2019/4/4/1.JPG' }} />
                        <Text style={styles.date}>2019-04-09</Text>
                    </View>
                    <View style={styles.artcileText}>
                        <Text numberOfLines={1} style={styles.artcileTitle}>机械优集学院召开学士学位授权评审校内专家指导会</Text>
                        <Text numberOfLines={2} style={styles.artcileContent}>4月2日下午，在机械馆二楼会议室，机械优集学院召开材料成型及控制工程专业学士学位授权评审校内专家指导会。教务处处长王伟、教育教学评估处处长孙长银、汽车工程学院院长倪骁骅、教务处副处长吕立斌等进行指导。专业系主任夏建生按照省厅评审要求对专业建设、师资队伍、教学情况进行了汇报，院长周海介绍了专业授权评审工作准备情况，副院长陈青提出了目前亟待解决</Text>
                    </View>

                </View >
                <View style={styles.box}>
                    <View style={styles.dateImage}>
                        <Image style={styles.articleImage} source={{ uri: 'http://jwc.ycit.cn/upload/images/2019/3/31/1.png' }} />
                        <Text style={styles.date}>2019-04-09</Text>
                    </View>
                    <View style={styles.artcileText}>
                        <Text numberOfLines={1} style={styles.artcileTitle}>我校召开2019版本科人才培养方案培训会</Text>
                        <Text numberOfLines={2} style={styles.artcileContent}>3月29日上午，在南区行政楼9楼会议室，学校组织各教学院部教学院长（主任）、教科研办公室主任及教务处、评估处、设备处等部门相关人员就2019版本科人才培养方案制定工作召开专门培训会。学校副校长王资生出席并讲话。教务处处长王伟主持。会上，教务处副处长吕立斌对大家进行培训，从指导思想、基本原则、具体要求等方面对2019版人才培养方案指导意见进行了详细解读</Text>
                    </View>

                </View>
                <View style={styles.box}>
                    <View style={styles.dateImage}>
                        <Image style={styles.articleImage} source={{ uri: 'http://jwc.ycit.cn/upload/images/2019/3/15/1.jpg' }} />
                        <Text style={styles.date}>2019-04-09</Text>
                    </View>
                    <View style={styles.artcileText}>
                        <Text numberOfLines={1} style={styles.artcileTitle}>教务处处长王伟应邀赴江苏省江都中等专业学校作专题报告</Text>
                        <Text numberOfLines={2} style={styles.artcileContent}>3月14日下午，我校教务处处长王伟、副处长李爱国等赴江苏省江都中等专业学校参加“3+4”合作项目师生和家长交流会。王伟应邀作专题报告。该校党委副书记张红旗主持，“3+4”项目专业负责人、师生及家长400余人聆听了报告。王伟报告的题目是《未来你的样子》，指出读书的重要性和意义，强调大学教育不只是让学生谋求衣食无忧，更主要的是让学生探求丰衣足食后的人生意</Text>
                    </View>

                </View>
                <View style={styles.box}>
                    <View style={styles.dateImage}>
                        <Image style={styles.articleImage} source={{ uri: 'http://jwc.ycit.cn/upload/images/2019/3/13/%E8%8E%86%E7%94%B0%E5%AD%A6%E9%99%A2.jpg' }} />
                        <Text style={styles.date}>2019-04-09</Text>
                    </View>
                    <View style={styles.artcileText}>
                        <Text numberOfLines={1} style={styles.artcileTitle}>莆田学院来我校调研</Text>
                        <Text numberOfLines={2} style={styles.artcileContent}>3月7日下午，莆田学院教务处副处长陈志勇一行8人来我校就应用型人才培养方案制定、应用型人才培养模式、学校转型发展的经验与做法、教学管理工作等方面内容进行调研。我校教务处、宣传部、评估处、体育部、人文学院、数理学院等相关人员接待并参加座谈交流。教务处处长王伟主持交流会。会上，王伟向来宾介绍了我校发展历程、办学定位、人才培养、校企合作、工程认证</Text>
                    </View>

                </View>

            </View>

        );
    }
    itemClick() {
        this.props.navigation.navigate('NewsContent')
    }
    renderItem = (item, index) => {
        return (

            <TouchableOpacity onPress={() => this.props.navigation.navigate('NewsContent')} >
                <View style={styles.box}>
                    <View style={styles.dateImage}>
                        <Image style={styles.articleImage} source={{ uri: 'http://jwc.ycit.cn/upload/images/2019/3/13/%E8%8E%86%E7%94%B0%E5%AD%A6%E9%99%A2.jpg' }} />
                        <Text style={styles.date}>2019-04-09</Text>
                    </View>
                    <View style={styles.artcileText}>
                        <Text numberOfLines={1} style={styles.artcileTitle}>莆田学院来我校调研</Text>
                        <Text numberOfLines={2} style={styles.artcileContent}>3月7日下午，莆田学院教务处副处长陈志勇一行8人来我校就应用型人才培养方案制定、应用型人才培养模式、学校转型发展的经验与做法、教学管理工作等方面内容进行调研。我校教务处、宣传部、评估处、体育部、人文学院、数理学院等相关人员接待并参加座谈交流。教务处处长王伟主持交流会。会上，王伟向来宾介绍了我校发展历程、办学定位、人才培养、校企合作、工程认证</Text>
                    </View>

                </View>
            </TouchableOpacity>

        )
    }
    render() {
        return (
            <View style={styles.article}>
                <FlatList
                    data={this.state.articleList}
                    // onBeginRefresh={this._onTopRefresh}
                    onEndReached={this._onEndReached}
                    onEndReachedThreshold={0.2}
                    onMomentumScrollBegin={() => {
                        this.onEndReachedCallDuringMomentum = false
                    }}
                    ListEmptyComponent={this.createEmptyView()}
                    renderItem={({ item, index }) => this.renderItem(item, index)}
                    contentContainerStyle={styles.flatList} />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    article: {

        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',

    },
    box: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        marginRight: 20,
        marginTop: 15,
        paddingBottom: 10,
        borderBottomColor: '#E8E7E7',
        borderBottomWidth: 2,
    },
    date: {
        fontSize: 12
    },
    dateImage: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    artcileText: {
        flexDirection: 'column',


    },
    artcileTitle: {
        fontSize: 16,
        color: '#5C5858',
        lineHeight: 35,
        paddingLeft: 20,
        fontWeight: 'bold',
        // height:25,
        width: Util.width - 100,
        marginTop: -19

    },
    artcileContent: {
        fontSize: 14,
        color: '#5C5858',
        lineHeight: 25,
        paddingLeft: 20,
        width: Util.width - 100

    },
    line: {
        width: Util.width,
        height: 1,
        backgroundColor: "#E8E7E7",
        borderBottomColor: '#E8E7E7',
        borderBottomWidth: 1,
        marginBottom: 20
    },
    articleImage: {
        width: 75,
        height: 75,
        borderRadius: 6,


    },
    send: {
        // paddingTop: 1,
        paddingLeft: 6,
        // paddingRight: 6,
        width: 45,
        height: 30,
        overflow: 'hidden',
        marginLeft: 5,
        backgroundColor: '#FD0C46',

        borderColor: '#FD295C',
        borderWidth: 2,
        paddingTop: 5
    },
    flatList: {
        // flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'center',
        paddingLeft: 12

    }
})

