import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const ViewScreen = ({route, navigation}) => {
  console.log(route.params.category)
  return (
    <View style={{width: '100%', flexDirection: 'row'}}>
      <Text style={styles.category}>ViewScreen </Text>
      <View style={styles.viewContainer}>
           <Text style={styles.viewTitle}> View All</Text>
       </View>
    </View>
  )
}

const styles = StyleSheet.create({
    category: {
        flex: 1,
        margin: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3896DB',
      },
    viewContainer: {
        borderRadius: 5,
        padding: 5,
        marginRight: 15,
        backgroundColor: '#c8e2f4',
        alignSelf: 'center',
    },
    viewTitle: {
        fontSize: 12,
        color: '#469BDA',
        fontWeight: 'normal',
    },
});

export default ViewScreen