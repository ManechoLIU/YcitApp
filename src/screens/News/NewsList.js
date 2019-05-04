import React from 'react'
import { Text, View, StyleSheet, } from 'react-native'

export default class NewsList extends React.Component {
    render() {
        return (
            <View style={styles.container}>
            <View style={styles.header}>
            <Text style={styles.headerTitle}>咨讯页面</Text>
            </View>
                
            </View>

        )
    }
}
// export default connect(state => state.reducer)(Register)
const styles = StyleSheet.create({

   account:{
       fontSize:20,
       
   }
})
