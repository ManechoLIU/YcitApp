import React from 'react'
import { Text, View, AppRegistry, Modal, Alert, NavigationActions, TouchableOpacity, Image, Switch, ImageBackground, TextInput, StyleSheet, ScrollView } from 'react-native'
// 提交成功
export default class Success extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
    }
  }
  setModalVisible = (visible) => {
    this.setState({
      modalVisible: visible
    })
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#6C6565' }}>
        <Modal
          animationType='none'
          transparent={true}
          visible={this.state.modalVisible}

          onShow={() => {
            <Image source={require('../../assets/tjcg-dt.png')} />
          }}
          supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ImageBackground style={styles.bgImage} source={require('../../assets/tjcg-dt.png')} >
              <TouchableOpacity onPress={() => {
                this.props.navigation.goBack()
                // NavigationActions.navigate( 'Discovery' )
              }}>
                <Image style={styles.cancell} source={require('../../assets/tjcg-no.png')} />
              </TouchableOpacity>
              <View style={styles.content}>
                <Text style={styles.success}>恭喜！提交成功啦</Text>
                <Image style={styles.successIcon} source={require('../../assets/tjcg-on.png')} />
              </View>
            </ImageBackground>
          </View>
        </Modal>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  bgImage: {
    width: 259,
    height: 160
  },
  success: {
    fontSize: 15,
    color: '#453E3E'
  },
  cancell: {
    marginLeft: 236.5,
    marginTop: 2.5
  },
  content: {
    width: 259,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  successIcon: {
    marginTop: 15
  },
})
