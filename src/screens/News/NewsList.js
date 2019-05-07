import React from 'react'
import { Text, FlatList, ActivityIndicator, View, Image, StyleSheet,DeviceEventEmitter,
     Button, ScrollView, TouchableOpacity } from 'react-native'
import Util from "../../static/util"
import API from '../../static/methods'

let pageNo = 1;//当前第几页
let totalPage = 5;//总的页数
let itemNo = 0;//item的个数


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
        formData.append('moment_num',10)
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

    componentDidMount() {
        let _this = this
        DeviceEventEmitter.addListener('publish',(event)=>{
            _this.setState({
                articleList: [],
            isLoading: false,
            page: 1,
            moment_id: -1,
            dataLength: 10,
            imagesLength: 1,
            lastmoment_id: -1
            })
            _this.GetArticleList()
        })
        this.GetArticleList()
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
            <View style={styles.box}>

                <Image style={styles.articleImage} source={{uri:'http://jwc.ycit.cn/upload/images/2019/4/12/1.png'}} />
                
                <TouchableOpacity onPress={() => {
                    this.GetArticleList()
                }}>
                    <Text style={styles.artcileTitle}>标题</Text>
                </TouchableOpacity>

                <View style={styles.line}></View>


            </View>
        );
    }
    itemClick() {
        this.props.navigation.navigate('ImageContent')
    }
    renderItem = (item, index) => {
        return (

            <TouchableOpacity onPress={() => this.props.navigation.navigate('ImageContent', { moment_id: item.id })} >
                <View style={styles.box}>
                    <Image style={styles.articleImage} source={{ uri: item.images[0].image_path }} />
                    
                    <Text style={styles.artcileTitle}>{item.content}</Text>

                    <View style={styles.line}></View>
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
                    style={styles.flatList} />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    article: {

        flexDirection: "column",
    },
    box: {
        backgroundColor: '#FFFFFF'
    },
    artcileTitle: {
        fontSize: 16,
        color: '#5C5858',
        lineHeight: 35,
        paddingLeft: 20,

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
        width: 50,
        height: 50,
        marginTop: 15

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
    }

})

