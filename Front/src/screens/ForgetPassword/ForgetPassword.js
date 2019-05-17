import React from 'react'
import { Text, View, Image, ImageBackground, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import util from "../../static/util"
import { connect } from 'react-redux'
import Button from 'react-native-button'
import VerificationCodeButton from '../../components/VerificationCodeButton'
import API from '../../static/methods'
export default class ForgetPassword extends React.Component {
    constructor() {
        super()
        this.state = {
            mobile: '',
            code: '',
            password: '',
        }
    }

   
    render() {
        return (
            <View style={styles.me}>
                <View style={styles.contentBar}>
                    <View style={styles.contentItem}>
                        <TextInput style={styles.title}
                            placeholder={'请输入手机号'}
                            maxLength={11}
                            value={this.state.mobile}
                            onChangeText={(text) => /^[0-9]*$/.test(text)
                                ? this.setState({ mobile: text })
                                : ''}
                        ></TextInput>
                    </View>
                    <View style={styles.contentItem}>
                        <View style={styles.phone}>
                            <TextInput style={styles.title}
                                placeholder='手机验证码'
                                maxLength={6}
                                keyboardType={'numeric'}
                                value={this.state.code}
                                onChangeText={(text) => /^[0-9]*$/.test(text)
                                    ? this.setState({ code: text })
                                    : ''}
                            ></TextInput>
                            <View style={styles.codeBox}>
                                <VerificationCodeButton
                                    text='获取验证码'
                                  />
                            </View>
                        </View>

                    </View>
                    <View style={styles.contentItem}>
                        <TextInput style={styles.title}
                            placeholder='请输入密码'
                            value={this.state.password}
                            secureTextEntry={true}
                            onChangeText={(text) => this.setState({ password: text })}
                        ></TextInput>
                    </View>
                    {/* <View style={styles.contentItem}>
                        <TextInput style={styles.title}
                            placeholder='请输入密码'
                            value={this.state.password}
                            secureTextEntry={true}
                            onChangeText={(text) => this.setState({ password: text })}
                        ></TextInput>
                    </View> */}
                </View>

                <Button containerStyle={styles.button} onPress={() => { this.Login() }} >
                    <Text style={styles.next}> 下一步</Text>
                </Button>



            </View>


        )
    }
}
const styles = StyleSheet.create({

    register: {
        fontSize: 20,
        color: '#FFFFFF'
    },

    // 注册信息
    contentBar: {
        width: util.width * 11 / 12,
        height: util.width * 11 / 12,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 17,
        marginTop: 60,
        borderRadius: 5,

    },
    contentItem: {
        width: util.width * 3 / 4,
        flexDirection: 'column',
        borderBottomColor: '#C9C0C2',
        borderBottomWidth: 0.5,
        marginBottom: 25,


    },
    title: {
        fontSize: 17,
        color: '#655B5E'

    },

    // 手机验证码
    phone: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    codeBox: {
        borderLeftColor: '#7D7D7D',
        borderLeftWidth: 0.5
    },
    code: {
        paddingLeft: 10,
        fontSize: 17,
        color: '#FD0C46'
    },
    button: {
        backgroundColor: '#FF0042',
        width: util.width * 3 / 4,
        height: 55,

        color: 'white',
        paddingTop: 15,
        marginLeft: 52,
        borderRadius: 10
    },
    next: {
        color: 'white',
        fontSize: 24,
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingBottom: 5
    },

})
