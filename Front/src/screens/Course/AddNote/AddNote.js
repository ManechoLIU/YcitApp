import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Text,
    Platform,
    ListView,
    TextInput,
    Image,
    View,
    TouchableHighlight,
    Animated,
    ScrollView,
} from 'react-native';
import Photo from './Photo';
import Util from '../../../static/util';
import Icon from 'react-native-vector-icons/Ionicons';
import Dimensions from 'Dimensions';
const { width, height } = Dimensions.get('window');

export default class AddNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // title: this.props.navigation.state.params.Title,
            title: '',
            tip: '',
            content: '',
            img: '',
            testImage: '',
            imgIcon: require('../../../assets/bj-tj.png')

        }
    }
    _setImage(testImage) {
        this.setState({
            testImage: testImage
        })
        console.log("testImage:" + testImage)
        console.warn(testImage)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backBox}
                        onPress={() => { this.props.navigation.goBack() }}
                    >
                        <Icon name='ios-arrow-back'
                            style={styles.backIcon}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>
                        写便签
                    </Text>
                </View>
                <ScrollView>
                    <View>

                        <View style={styles.wrap}>
                            <TextInput
                                placeholder='请输入标题'
                                underlineColorAndroid='transparent'
                                keyboardType='default'
                                style={styles.content1}
                                onChangeText={(text) => {
                                    this.setState({
                                        title: text
                                    });
                                }}>
                                {this.state.tip}
                            </TextInput>
                        </View>
                        <View style={styles.inputContent}>
                            <TextInput
                                placeholder='请输入内容'
                                underlineColorAndroid='transparent'
                                keyboardType='default'
                                style={styles.content2}
                                multiline={true}
                                onChangeText={(text) => {
                                    this.setState({
                                        content: text
                                    });
                                }}
                            >{this.state.content}</TextInput>
                            <Image source={{ uri: this.state.testImage }} style={styles.testImage} />
                        </View>
                        <Photo _setImage={this._setImage.bind(this)} />
                        <View style={styles.btn}>
                            <Text style={styles.btnText} onPress={() => {
                                this._fetchData();
                                // this.props.navigation.goBack()
                            }}>确定</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
    async _fetchData() {
        fetch('http://192.168.43.60:5002/api/notelist/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title:this.state.title,
                content:this.state.content,
                testImage:this.state.testImage
            })
        })
            .then((res) => {
                console.log(res)
                // alert(res.status)
                if (res.status === 200) {
                    this.props.navigation.navigate('NoteList')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F0F1',
    },
    header: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        paddingTop: 12,
        paddingBottom: 12,
        height: 48,
        backgroundColor: '#FF0042',
        flexDirection: 'row',
        paddingLeft: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        position: 'absolute',
        left: 40,
        top: 12,
    },
    backBox: {
        position: 'absolute',
        left: 0,
        top: 12,
        width: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor:'yellow',
    },
    backIcon: {
        color: '#fff',
        fontSize: 28,
        //marginRight:10
    },
    textWrap: {
        paddingLeft: 15,
        backgroundColor: '#fff',
        flexDirection: 'row',
        height: 50,
        paddingRight: 15,
        alignItems: 'center',
        marginBottom: 1,
    },
    textBtn: {
        fontSize: 18,
        color: 'black',
    },
    commentIcon: {
        justifyContent: 'flex-end',
        position: 'absolute',
        right: 15,
    },
    textName: {
        fontSize: 18,
        color: 'black',
    },
    textMessage: {
        fontSize: 16,
        position: 'absolute',
        right: 15,
    },
    content1: {
        paddingLeft: 10,
        color: '#333',
        fontSize: 16,
        height: 40,
    },
    content2: {
        paddingLeft: 10,
        color: '#333',
        fontSize: 16,
        height: 80,
        marginBottom: 10,
    },
    wrap: {
        marginTop: 15,
        width: width * 0.9,
        marginLeft: width * 0.05,
        backgroundColor: '#fff',
    },
    inputContent: {
        marginTop: 15,
        width: width * 0.9,
        marginLeft: width * 0.05,
        height: 300,
        backgroundColor: '#fff',

    },
    testImage: {
        marginTop: 15,
        marginLeft: width * 0.05 - 8,
        width: 150,
        height: 150
    },
    btn: {
        marginTop: 10,
        width: width * 0.9,
        marginLeft: width * 0.05,
        backgroundColor: '#FF0042',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ffff',
    },
    btnText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    },

});