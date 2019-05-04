import {Dimensions} from 'react-native'
import Toast from 'react-native-root-toast';
const address = 'http://222.188.0.101/'
let {width, 
  height, 
  scale} = Dimensions.get('window');

  // height = height>700? height*1.05: height

let backgroundColor = '#f0f0f0'
let toast;

/**
 * 冒一个时间比较短的Toast
 * @param content
 */
function toastShort(content) {
  if (toast !== undefined) {
    Toast.hide(toast);
  }
  toast = Toast.show(content.toString(), {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0
  });
}

/**
 * 冒一个时间比较长的Toast
 * @param content
 */
function toastLong(content) {
  if (toast !== undefined) {
    Toast.hide(toast);
  }
  toast = Toast.show(content.toString(), {
    backgroundColor: 'rgba(152,66,250,.8)',
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0
  });
}
function post({ url, formData } = {}) {
  console.log('post')
  options = {
      method: "POST",
      headers: {
          Accept: "application/json"
      },
      body: formData
  };
  var promise = new Promise(function (resolve, reject) {
      fetch(address + url, options).then(data => {
          console.log('******')
          resolve(data);
          console.log('data'+data)
      }).catch(error => {
          reject(error);
      });
  });
  return promise;

}
/**
 * // 设置异步超时返回
 * @param {function} fetch_promise - 异步函数
 * @param {int} timeout - 超时时间
 */
function _fetch(fetch_promise, timeout = 15000) {
  var abort_fn = null;
  setTimeout(function () {
      abort_fn();
  }, timeout);
  var abort_promise = new Promise(function (resolve, reject) {
      abort_fn = function () {
          reject("timeout");
      };
  });
  var abortable_promise = Promise.race([fetch_promise, abort_promise]);
  return abortable_promise;
}
//网络变化监听
function network() {
  NetInfo.addEventListener("connectionChange", data => {
      data.type == "none"
          ? Alert.alert("网络连接已断开", "请检查你的网络，确保在网络连接下进行使用", [
              {
                  text: "确定",
                  onPress: () => { }
              }
          ])
          : "";
  });
}
// 安卓后退处理
function backhandler() {
  let listener = BackHandler.addEventListener("hardwareBackPress", () => {
      Alert.alert("提示", "您确定要退出吗？", [
          {
              text: "确定",
              onPress: () => {
                  BackHandler.exitApp();
              }
          }, {
              text: "取消",
              onPress: () => { }
          }
      ], { cancelable: false });
      return true;
  });
  return listener;
}

/**
* // 提示弹窗
* @typedef {}
* @type {object}
* @property {string} [title] - 弹窗标题
* @property {string} [content] - 弹窗内容
* @property {string} [confirmtext] - 弹窗确定键文字
* @property {function} [confirmFunction] - 确定键触发的函数
*/
function modalAlert({
  title = "提示",
  content,
  confirmtext = "确定",
  confirmFunction = () => { }
} = {}) {
  Alert.alert(title, content, [
      {
          text: confirmtext,
          onPress: confirmFunction
      }
  ]);
}
/**
* // 确认框弹窗
* @typedef {}
* @type {object}
* @property {string} [title] - 弹窗标题
* @property {string} [content] - 弹窗内容
* @property {string} [confirmtext] - 弹窗确定键文字
* @property {string} [canceltext] - 弹窗取消键文字
* @property {function} [confirmFunction] - 确定键触发的函数
* @property {function} [cancelFunction] - 取消键触发的函数
*/
function confirmAlert({
  title = "提示",
  content,
  confirmtext = "确定",
  canceltext = "取消",
  confirmFunction = () => { },
  cancelFunction = () => { }
} = {}) {
  Alert.alert(title, content, [
      {
          text: confirmtext,
          onPress: confirmFunction
      }, {
          text: canceltext,
          onPress: cancelFunction
      }
  ], { cancelable: false });
}
function xmlToJson(xmlStr) {
  xmlStr= xmlStr.replace(/&lt;/g,'<');//防止有转义字符
  xmlStr=  xmlStr.replace(/&gt;/g,'>');
  xmlStr=  xmlStr.replace(/&amp;/g,'&');
  var str1 = "",str2 = "",str3 = "";
  let str =xmlStr;
  let start1 = false;
  let start2 = false;
  var arr = [];
  for(let i =0;i<str.length;i++){
      let s = str[i];
      if(start1&&s!==">"&&s!=='<'){
          str1+=s;
      }else if(str1!==""){
          arr.push(str1);
          str1 = "";
      }
      if(start2&&s!==">"&&s!=='<'){
          str2+=s;
      }else if(str2!==""){
          arr.push(str2);
          str2 = "";
      }
      if(s==='<'){
          start1 = true;
          start2 = false;
      }
      if(s==='>'){
          start1 = false;
          start2 = true;
      }


  }
  var json = {};
  for(let i = 0;i<arr.length-2;i++){
      let strtemp = arr[i+2];



      if(strtemp.length>2 && strtemp===("/"+arr[i])){

          strtemp =strtemp.substring(1,strtemp.length);

          if(arr[i] === strtemp){
              json[arr[i]]=arr[i+1];
          }
      };
  }

  return json;
}

export default {
  width,
  height,
  scale,
  backgroundColor,
  post,
  _fetch,
  network,
  backhandler,
  modalAlert,
  confirmAlert,
  toastShort,
  toastLong,
  xmlToJson

}