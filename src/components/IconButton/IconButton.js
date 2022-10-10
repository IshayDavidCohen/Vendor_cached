import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import React from 'react'

// TODO: Work on adding images
// TODO: Add the ability of base CSS (padding etc.) and custom CSS (btn color etc.)

const IconButton = ({onPress, text, type = 'PRIMARY', bgColor, fgColor}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5} style={[ styles.container, styles[`container_${type}`], bgColor ? {backgroundColor: bgColor} : {}]}>
        <Text style={[ styles.text_BASE, styles[`text_${type}`], fgColor ? {color: fgColor} : {}]}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        marginVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 0
        },
    },
    container_PRIMARY: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#dfe4f7',
        alignItems: 'center',
        justifyContent: 'center',
      },
    text_BASE: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white'
    },
    text_PRIMARY: {
        color: '#7C42FE'
    },
})
export default IconButton