import { View, Text, StyleSheet} from 'react-native'
import React from 'react'
import { Rating } from 'react-native-ratings'


const Ratings = ({setValue, text='', length = 3, startingValue = 1, readonly = false, bgColor = '#F0F0F0'}) => {
  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <Text style={styles.title}>{text}</Text>
        <Rating type='custom' ratingCount={length} startingValue={startingValue} imageSize={20} jumpValue={0.5}
        readonly={readonly} tintColor={bgColor} onFinishRating={setValue}/>
    </View>
  )
}

const styles = StyleSheet.create({
    title: {
        marginTop: 3,
        marginHorizontal: 10,
        fontSize: 14,
        color: 'black',
    }
  })

export default Ratings