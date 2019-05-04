import React from 'react'
import { Text, View, StyleSheet, ListView, TouchableOpacity } from 'react-native'
import API from '../../static/util'



export default class CourseList extends React.Component {
    constructor(props) {
        super(props);
        // 创建datasource数据源
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            // 用相应的clone方法设置datasource的初始值
            dataSource: ds.cloneWithRows([{
                "_id": "650000200301144591",
                "thumb": "http://dummyimage.com/1200*600/ae79f2",
                "video": "blob:https://www.imooc.com/e8048cf8-15e2-49f7-bfcd-5ca19b9d69a5",
                "success": true
              },
              {
                "_id": "410000197310116673",
                "thumb": "http://dummyimage.com/1200*600/79f28a",
                "video": "blob:https://www.imooc.com/e8048cf8-15e2-49f7-bfcd-5ca19b9d69a5",
                "success": true
              },]),//data.result为模拟的数据或服务端得到的数据
            
        }
        
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>列表页面</Text>
                </View>
                {/* <ListView
                    dataSource={this.state.dataSource}//关联state中的datasource
                    renderRow={(item) => this.renderRow(item)}//制定listView的显示效果
                    enableEmptySections={true}
                >
                </ListView> */}
            </View>

        )
    }
}
// export default connect(state => state.reducer)(Register)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'

    },
    header: {
        paddingTop: 25,
        paddingBottom: 12,
        backgroundColor: '#ee735c'
    },
    headerTitle: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600'
    }

})
