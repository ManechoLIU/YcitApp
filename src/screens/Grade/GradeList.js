import React from 'react'
import { Text, View, StyleSheet, } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class GradeList extends React.Component {
    render() {
        return (
            <View style={styles.container}>
            
            <View style={styles.header}>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Account')}}>
            <Text style={styles.headerTitle}>成绩页面</Text>
            </TouchableOpacity>
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
