import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.4)
export const ITEM_HEIGHT = Math.round(Dimensions.get('window').height / 5) // Fifth of the user's screen

const CarouselCardItem = ({ item, index }) => {
  return (
      <View style={styles.container} key={index}>
        <Image
          source={{ uri: item.imgUrl }}
          style={styles.image}
        />
        <Text style={styles.header}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
  },
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT * 0.7, // 70% of carousel size 
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    resizeMode: 'stretch'
  },
  header: {
    color: "#222",
    fontSize: 12,
    fontWeight: "bold",
    paddingLeft: 5,
  },
  body: {
    color: "#222",
    fontSize: 10,
    paddingLeft: 5,
  }
})

export default CarouselCardItem