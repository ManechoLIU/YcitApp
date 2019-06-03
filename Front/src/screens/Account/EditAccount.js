import React from 'react'
import {
  Text, View, Image, ImageBackground, StyleSheet, TextInput, StatusBar, Platform,
  Button, ScrollView, TouchableOpacity, Picker, TouchableHighlight, AsyncStorage,
  DeviceEventEmitter
} from 'react-native'
import util from "../../static/util"
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import { DatePicker, List, Provider } from '@ant-design/react-native';
import API from '../../static/methods'

const address = 'http://appback.futuredigitalplanets.com/index.php/'

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);


// 编辑个人资料
export default class EditAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      name: '',
      sex: '',
      birthday: new Date(),
      visible: false,
      hideBirthday: false,
      sno: '',
      hideSno: false,
      major: '',
      hideMajor: false,
      classes: '',
      hideClass: false,
      phone: '',
      hidePhone: false,
      email: '',
      hideEmail: false,
      account: '',
      headImg: '',
      scrollEnable: true,
      token: ''
    }
  }

  componentDidMount() {
    var that = this
    that.GetUserList()
  }
  async GetUserList() {
    var that = this
    util.get('http://192.168.43.60:5002/api/userlist', function (data) {
      console.log(data)
      if (data) {
        that.setState({
          userList: data,
          username: data[0].username,
          name: data[0].name,
          sno: data[0].sno,
          sex: data[0].sex,
          headImg: data[0].headImg,
          // birthday: data[0].birthday,
          major: data[0].major,
          classes: data[0].classes,
          phone: data[0].phone,
          email: data[0].email
        })
      } else {
        alert('获取用户列表失败！');
        console.log("shibai")
      }

    }, function (err) {
      alert(err);
      console.log(err)
      alert('服务异常,正在紧急修复,请耐心等待');
    })

  }
  async UpdateInfo() {
    fetch('http://192.168.43.60:5002/api/userlist/edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: "5cde60c3a450c928f8718a0f",
        headImg:this.state.headImg,
        username: this.state.username,
        name: this.state.name,
        sno: this.state.sno,
        sex: this.state.sex === 0 ? '女' : '男',
        major: this.state.major === null ? '' : this.state.major,
        classes: this.state.classes,
        phone: this.state.phone,
        email: this.state.email
      })
    })
      .then((res) => {
        // alert(res.status)
       if(res.status===200){
        this.props.navigation.navigate('Success')
       }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  async SaveInfo() {
    let formData = new FormData()
    // formData.append('id', '5cde60c3a450c928f8718a0f')

    formData.append('username', this.state.username)
    formData.append('name', this.state.name === null ? '' : this.state.name)
    formData.append('sno', this.state.sno === null ? '' : this.state.sno)
    formData.append('major', this.state.major === null ? '' : this.state.major)
    formData.append('sex', this.state.sex === 0?'女':'男')
    // formData.append('headImg', this.state.headImg === null ? '' : this.state.headImg)
    // formData.append('birthday', this.state.birthday === null ? '' : this.state.birthday)
    formData.append('major', this.state.major === null ? '' : this.state.major)
    formData.append('classes', this.state.classes)
    formData.append('phone', this.state.phone)
    formData.append('email', this.state.email === null ? '' : this.state.email)
    // var opts = {
    //   method: "POST",
    //   body: formData
    // }
    // fetch('http://192.168.43.60:5002/api/userlist/edit', opts).
    // then((response) => {
    //   return response.text();
    // })
    //   .then((responseText) => {
    //     alert(responseText);
    //     console.log(responseText)
    //   })
    //   .catch((error) => {
    //     alert(error)
    //   })
    try {
      let response = await API._fetch(API.post({ url: 'edit', formData }))
      let responseJson = await response.json()

      if (responseJson.status) {
        console.log(responseJson)
        this.props.navigation.navigate('Account')
        API.toastLong('编辑成功')
        alert(responseJson.status)
      }
      else {
        API.toastLong(responseJson.info)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async changeAvatar() {
    let formData = new FormData();
    StatusBar.setBarStyle("dark-content");
    try {
      let photo = await API.imagePicker()
      let that=this
      that.setState({
        headImg:photo.path
      })
      console.log(photo.path)
      // let submitPhoto = {
      //   uri: photo.path,
      //   name: id + 'headImg' + new Date().getTime(),
      //   type: 'multipart/form-data',
      // }
      // formData.append("file", submitPhoto);
      // let _this = this

      // fetch(address + 'Api/FileUpload/uploadImage', {
      //   method: 'POST',
      //   headers: {
      //     // Accept: "application/json",
      //     'Content-Type': 'multipart/form-data',
      //   },
      //   body: formData,
      // })
      //   .then((response) => response.text())
      //   .then(async (responseData) => {
      //     let path = JSON.parse(responseData).data.path

      //     _this.setState({
      //       headImg: {uri: JSON.parse(responseData).data.path},
      //     })
      //     DeviceEventEmitter.emit('newInfo', {
      //       headImg: JSON.parse(responseData).data.path,
      //       nickname: this.state.username
      //     })
      //     this.SaveInfo()
      //     API.toastLong('上传成功')
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //     API.toastLong(error)
      //   });
    } catch (error) {
      console.log(error)
    }
  }

  render() {

    let datePicker = this.state.visible ? <DatePicker
      style={{ position: 'absolute', bottom: 0 }}
      visible={this.state.visible}
      value={this.state.birthday}
      mode="date"
      minDate={new Date(1900, 1, 1)}
      maxDate={new Date()}
      onDismiss={() => this.setState({ visible: false })}
      onOk={(birthday) => {
        this.setState({
          visible: false,
          birthday: birthday
        })
      }}
      onChange={(birthday) => this.setState({ birthday: birthday })}
      format="YYYY-MM-DD"
    /> : null

    return (
      <ScrollView contentContainerStyle={{ height: util.height }}>

        <ImageBackground style={styles.bgImage} source={{ uri: this.state.headImg }}>
          <ImageBackground source={require('../../assets/me_background.png')}
            style={[styles.bgImage, { opacity: 0.9 }]}
          />
        </ImageBackground>

        <View style={[styles.meAbove, { marginTop: Platform.OS === 'android' ? 0 : 20 }]}>
          <ImageBackground style={styles.bgImage}>
            <TouchableOpacity style={styles.fhIcon} onPress={() => this.props.navigation.goBack()}>
              <Image source={require('../../assets/grzy-icon-fh.png')} style={{ width: 15, height: 15 }} />
            </TouchableOpacity>
            <Text style={styles.titleText}>编辑个人资料</Text>

            <TouchableOpacity onPress={() => this.UpdateInfo()} style={{ position: 'absolute', right: 20, top: 15 }}>
              <ImageBackground source={require('../../assets/circle-button.png')} style={styles.header}>
                <Text style={{ color: '#fff' }}>提交</Text>
              </ImageBackground>
            </TouchableOpacity>
          </ImageBackground>
          <View style={styles.infoContainer}>
            <Image source={{ uri: this.state.headImg }} style={styles.userFace} />
            <TouchableOpacity style={styles.change_avatar} onPress={() => this.changeAvatar()}>
              <Image source={require('../../assets/change-avatar.png')} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
          </View>


          <View
            style={styles.scrollContainer}
          >
            <View style={styles.inputContainer}>
              <Text style={styles.prompt}>用户名</Text>
              <TextInput
                style={styles.input}
                onChangeText={(username) => this.setState({ username })}
                defaultValue={this.state.username} />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.prompt}>姓名</Text>
              <TextInput
                style={styles.input}
                onChangeText={(name) => this.setState({ name })}
                defaultValue={this.state.name} />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.prompt}>性别</Text>

              <RadioGroup
                style={styles.radios}
                color='#f84d74'
                selectedIndex={this.state.sex === null ? 0 : this.state.sex}
                onSelect={(value) => this.setState({ sex: value })}
              >
                <RadioButton value={0}>
                  <Text>女</Text>
                </RadioButton>

                <RadioButton value={1}>
                  <Text>男</Text>
                </RadioButton>

              </RadioGroup>

            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.prompt}>生日</Text>
              <TouchableOpacity style={styles.input} onPress={() => this.setState({ visible: true })}>
                <View>
                  <Image source={require('../../assets/bjgrzl-icon-sr.png')}
                    style={styles.birthdayIcon} />
                  <Text style={[styles.input, { paddingBottom: 15, height: 40, borderBottomWidth: 0 }]}>
                    {this.state.birthday.getFullYear()}/{this.state.birthday.getMonth() + 1}/{this.state.birthday.getDate()}</Text>

                </View>

              </TouchableOpacity>
            </View>


            <View style={styles.inputContainer}>
              <Text style={styles.prompt}>学号</Text>
              <TextInput
                style={styles.input}
                onChangeText={(sno) => this.setState({ sno })}
                defaultValue={this.state.hideSno ? '***' :
                  (this.state.sno)} />
              <TouchableOpacity style={styles.hideIcon}
                onPress={() => this.setState({ hideSno: !this.state.hideSno })}>
                <Image style={styles.eye}
                  source={this.state.hideSno ?
                    require('../../assets/bjgrzl-eye-close.png') :
                    require('../../assets/bjgrzl-eye-on.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.prompt}>专业</Text>
              <TextInput
                style={styles.input}
                onChangeText={(major) => this.setState({ major })}
                defaultValue={this.state.hideMajor ? '***' :
                  (this.state.major)} />
              <TouchableOpacity style={styles.hideIcon}
                onPress={() => this.setState({ hideMajor: !this.state.hideMajor })}>
                <Image style={styles.eye}
                  source={this.state.hideMajor ?
                    require('../../assets/bjgrzl-eye-close.png') :
                    require('../../assets/bjgrzl-eye-on.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.prompt}>班级</Text>
              <TextInput
                style={styles.input}
                onChangeText={(classes) => this.setState({ classes })}
                defaultValue={this.state.hideClass ? '***' :
                  (this.state.classes)} />
              <TouchableOpacity style={styles.hideIcon}
                onPress={() => this.setState({ hideClass: !this.state.hideClass })}>
                <Image style={styles.eye}
                  source={this.state.hideClass ?
                    require('../../assets/bjgrzl-eye-close.png') :
                    require('../../assets/bjgrzl-eye-on.png')}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.prompt}>手机</Text>
              <TextInput
                style={styles.input}
                onChangeText={(phone) => this.setState({ phone })}
                defaultValue={this.state.hidePhone ? '***' : this.state.phone} />
              <TouchableOpacity style={styles.hideIcon}
                onPress={() => this.setState({ hidePhone: !this.state.hidePhone })}>
                <Image style={styles.eye}
                  source={this.state.hidePhone ?
                    require('../../assets/bjgrzl-eye-close.png') :
                    require('../../assets/bjgrzl-eye-on.png')}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.prompt}>邮箱</Text>
              <TextInput
                style={styles.input}
                onChangeText={(email) => this.setState({ email })}
                defaultValue={this.state.hideEmail ? '***' :
                  (this.state.email === null ? '未填写' : this.state.email)} />
              <TouchableOpacity style={styles.hideIcon}
                onPress={() => this.setState({ hideEmail: !this.state.hideEmail })}>
                <Image style={styles.eye}
                  source={this.state.hideEmail ?
                    require('../../assets/bjgrzl-eye-close.png') :
                    require('../../assets/bjgrzl-eye-on.png')}
                />
              </TouchableOpacity>
            </View>

            <Provider>
              {datePicker}
            </Provider>

          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  eye: {
    width: 20,
    height: 20,
    marginTop: 10
  },
  meAbove: {
    width: util.width,
    height: util.height * 4 / 11,
    position: 'absolute',
    top: 0
  },
  bgImage: {
    width: util.width,
    height: util.height * 2.2 / 11,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  fhIcon: {
    position: 'absolute',
    width: 15,
    height: 15,
    top: 20,
    left: 15
  },
  titleText: {
    position: 'absolute',
    top: 20,
    fontSize: 18,
    color: '#ffffff',
  },
  infoContainer: {
    borderRadius: 20,
    alignItems: 'center'
  },

  userFace: {
    width: API.reset(140),
    height: API.reset(140),
    top: API.reset(-70),
    borderColor: '#ffffff',
    borderWidth: 20,
    borderRadius: API.reset(70),
  },

  scrollContainer: {
    position: 'absolute',
    width: util.width,
    height: util.height * 6 / 11,
    top: util.height * 3.2 / 11 - 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20
  },

  inputContainer: {
    flexDirection: 'row',
    height: API.reset(55) - 5,
  },
  prompt: {
    fontSize: 15,
    marginTop: 26,
    color: '#7D7D7D'
  },
  input: {
    position: 'absolute',
    left: util.width * 2 / 11,
    borderBottomColor: '#C9C0C2',
    borderBottomWidth: 0.3,
    fontSize: 15,
    width: util.width * 7.5 / 11,
    height: API.reset(50),
    marginTop: 10,
  },
  radios: {
    flexDirection: 'row',
    position: 'absolute',
    left: util.width * 2 / 11,
    borderBottomColor: '#C9C0C2',
    borderBottomWidth: 0.3,
    width: util.width * 7.5 / 11,
    paddingTop: 10,
    paddingBottom: 20,
    height: API.reset(50),
  },

  hideIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 20,
    marginTop: 15
  },

  dateButton: {
    borderWidth: 1,
    borderColor: 'red',
    padding: 5,
    width: 300,
  },

  birthdayIcon: {
    width: 20,
    height: 20,
    margin: 15,
    marginTop: 10,
    marginLeft: 5
  },

  header: {
    width: 70,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  change_avatar: {
    backgroundColor: '#6D6769',
    width: API.reset(143),
    height: API.reset(143),
    top: API.reset(-210),
    borderColor: '#ffffff',
    borderWidth: 20,
    borderRadius: 140,
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  }

})

