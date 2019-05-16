import React from 'react'
import {
    Text, FlatList, ActivityIndicator, View, Image, StyleSheet, DeviceEventEmitter,
    Button, ScrollView, TouchableOpacity
} from 'react-native'
import Util from "../../static/util"
import API from '../../static/methods'
import Dimensions from 'Dimensions';
const { width, height } = Dimensions.get('window');

// 文章列表页面
export default class NewsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articleList: [],
        }
    }
    componentDidMount() {
        var that = this
        that.GetArticleList()
    }
    async GetArticleList() {
        var that = this
        Util.get('http://192.168.1.110:5002/api/newslist', function (data) {
            console.log(data)
            if (data) {
                console.log(data)
                that.setState({
                    articleList: data
                })
            } else {
                alert('获取新闻列表失败！');
                console.log("shibai")
            }

        },function (err) {
            alert(err);
            console.log(err)
            alert('服务异常,正在紧急修复,请耐心等待2');
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
                        <Image style={styles.articleImage} source={{ uri: item.icon }} />
                        <Text style={styles.date}>{item.date}</Text>
                    </View>
                    <View style={styles.artcileText}>
                        <Text numberOfLines={1} style={styles.artcileTitle}>{item.title}</Text>
                        <Text numberOfLines={2} style={styles.artcileContent}>{item.content}</Text>
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

