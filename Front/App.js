import React, { Component } from 'react';
import { Platform, StyleSheet, Text, AsyncStorage, View, Image, TouchableOpacity } from 'react-native';
import {
  createStackNavigator,
  createAppContainer,
  createMaterialTopTabNavigator,
  createBottomTabNavigator
} from 'react-navigation'
import Storage from "react-native-storage"
import GradeList from './src/screens/Grade/GradeList'
import CourseList from './src/screens/Course/CourseList'
import NewsList from './src/screens/News/NewsList'
import Account from './src/screens/Account/Account'
import CourseMessage from './src/screens/Course/CourseMessage'
import AddNote from './src/screens/Course/AddNote/AddNote'
import NewsContent from './src/screens/News/NewsContent'
import EditAccount from './src/screens/Account/EditAccount'
import Login from './src/screens/Login/Login'
import Register from './src/screens/Register/Register'
import ForgetPassword from './src/screens/ForgetPassword/ForgetPassword'
import Success from './src/screens/Account/Success'
import NoteList from './src/screens/Note/NoteList'
import NoteContent from './src/screens/Note/NoteContent'
const CreateTab = createMaterialTopTabNavigator({
  CourseList: {
    screen: CourseList,
    navigationOptions: {
      tabBarLabel: '课程表',
      tabBarIcon: ({ tintColor, focused }) => (
        focused ? <Image style={styles.icon} source={require('./src/assets/discovery_after.png')} /> :
          <Image style={styles.icon} source={require('./src/assets/discovery.png')} />
      )
    }
  },
  GradeList: {
    screen: GradeList,
    navigationOptions: {
      tabBarLabel: '成绩',
      tabBarIcon: ({ tintColor, focused }) => (
        focused ? <Image style={styles.icon} source={require('./src/assets/digging_after.png')} /> :
          <Image style={styles.icon} source={require('./src/assets/digging.png')} />
      )
    }
  },
  NewsList: {
    screen: NewsList,
    navigationOptions: {
      tabBarLabel: '新闻',
      tabBarIcon: ({ tintColor, focused }) => (
        focused ? <Image style={styles.icon} source={require('./src/assets/application_after.png')} /> :
          <Image style={styles.icon} source={require('./src/assets/application.png')} />
      )
    }
  },
  Account: {
    screen: Account,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({ tintColor, focused }) => (
        focused ? <Image style={styles.icon} source={require('./src/assets/me_after.png')} /> :
          <Image style={styles.icon} source={require('./src/assets/me.png')} />
      )
    }
  }
}, {
    initialRouteName: 'CourseList',
    tabBarPosition: 'bottom',
    lazy: true,
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: '#FD3260',
      inactiveTintColor: '#343131',
      showIcon: true,
      style: {
        height: "10%",
        backgroundColor: '#FFFFFF'
      },
    }
  })

const Root = Platform.OS === 'android' ? {
  screen: CreateTab,
  navigationOptions: {
    header: () => {
    },
  }
} : {
    screen: CreateTab,
    navigationOptions: {
      header: null
    }
  }
const StacksOverTabs = createStackNavigator({

  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      header: null
    }
  },

  Root: Root,
  ForgetPassword: {
    screen: ForgetPassword,
    navigationOptions: ({ navigation }) => ({
      headerTitle: '找回密码',

      headerStyle: {
        //标题栏样式
        backgroundColor: '#FF0042',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
      },
      headerLeft:
        <TouchableOpacity onPress={() => {
          // navigation.navigate('Discover')
          navigation.goBack()
        }}>
          <Image style={{ marginLeft: 20, width: 9, height: 18 }} source={require('./src/assets/grzy-icon.png')} />
        </TouchableOpacity>

    })
  },
  CourseList: {
    screen: CourseList,
    navigationOptions: {
      header: null
    }
  },
  GradeList: {
    screen: GradeList,
    navigationOptions: {
      header: null
    },
  },
  NewsList: {
    screen: NewsList,
    navigationOptions: ({ navigation }) => ({
      headerTitle: '新闻',
      headerStyle: {
        //标题栏样式
        backgroundColor: '#FF0042',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
      },
      headerLeft:
        <TouchableOpacity onPress={() => {
          navigation.goBack()
        }}>
          <Image style={{ marginLeft: 20, width: 9, height: 18 }} source={require('./src/assets/grzy-icon.png')} />
        </TouchableOpacity>

    })
  },

  NewsContent: {
    screen: NewsContent,
    navigationOptions: ({ navigation }) => ({
      headerTitle: '文章详情',
      headerStyle: {
        //标题栏样式
        backgroundColor: '#FFFFF',
      },
      headerTintColor: '#453E3E',
      headerTitleStyle: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
      },
      headerLeft:
        <TouchableOpacity onPress={() => {
          navigation.goBack()
        }}>
          <Image style={{ marginLeft: 15, width: 9, height: 18 }} source={require('./src/assets/bj-icon-fh.png')} />
        </TouchableOpacity>,
      headerRight:
        <TouchableOpacity onPress={() => {
          // // navigation.goBack()
          // DeviceEventEmitter.emit('share')
          // this.PaymentResponse.navigation.navigate('Share')
        }}>
          <Image style={{ marginRight: 20, width: 21, height: 21 }} source={require('./src/assets/tpxq-icon-fx.png')} />
        </TouchableOpacity>

    }),
  },
  Account: {
    screen: Account,
    navigationOptions: {
      header: null
    },
  },
  EditAccount: {
    screen: EditAccount,
    navigationOptions: {
      header: null
    }
  },
  CourseMessage: {
    screen: CourseMessage,
    navigationOptions: {
      header: null
    },
  },
  AddNote: {
    screen: AddNote,
    navigationOptions: {
      header: null
    },

  },
  Success: {
    screen: Success,
    navigationOptions: {
      header: null
    }
  },
  NoteList: {
    screen: NoteList,
    navigationOptions: {
      header: null
    }
  },
  NoteContent: {
    screen: NoteContent,
    navigationOptions: ({ navigation }) => ({
      headerTitle: '便签详情',
      headerStyle: {
        //标题栏样式
        backgroundColor: '#FFFFF',
      },
      headerTintColor: '#453E3E',
      headerTitleStyle: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
      },
      headerLeft:
        <TouchableOpacity onPress={() => {
          navigation.goBack()
        }}>
          <Image style={{ marginLeft: 15, width: 9, height: 18 }} source={require('./src/assets/bj-icon-fh.png')} />
        </TouchableOpacity>

    }),
  },

})
const StacksOverTab = createAppContainer(StacksOverTabs)
global.storage = new Storage({
  size: 1000, //最大容量
  storageBackend: AsyncStorage, //存储引擎
  defaultExpires: 1000 * 3600 * 24 * 30, //缓存时间
  // enableCache: true // 读写时在内存中缓存数据。默认启用。
})

export default class App extends Component {
  render() {
    return (
      <StacksOverTab ref='nav' />
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24
  },
  centerIcon: {
    width: 52,
    height: 52,
    position: 'absolute',
    zIndex: 100
  },
});
