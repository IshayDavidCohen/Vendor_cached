import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import IconButton from '../IconButton'
import CustomInput from '../CustomInput'


const CounterWidget = ({count, setCount, bgColor}) => {
  /**
   * CounterWidget
   * Function inherits React.useState() hook with two vars:  (1) getter | (2) setter
   *  useState() -> {count, setCount} is passed down to CustomInput which acts as the variable setter
   *  The parameters passed down to CounterWidget contains the data. 
   * @param {count} React.useState() getter
   * @param {setCount} React.usestate() setter
   */

  const onIncrease = () => {
    count = count || '0'
    setCount((parseInt(count) + 1).toString());
  }

  const onDecrease = () => {
    if (parseInt(count) > 0) {
      setCount((parseInt(count) - 1).toString());
    }
  }

  return (
    <View style={[styles.container, bgColor ? {backgroundColor: bgColor} : {}]}>
        <IconButton text={'-'} style={styles.item} onPress={onDecrease}/>
        <CustomInput type={'digitFilled'} style={styles.item} value={count} setValue={setCount}/>
        <IconButton text={'+'} style={styles.item} onPress={onIncrease}/>
    </View>
  )
}

export default CounterWidget

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#5685f5',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        alignItems: 'center',
        width: '35%',
        borderRadius: 15,
        paddingHorizontal: 5,
        shadowColor: "#000000",
        shadowOpacity: 0.15,
        shadowRadius: 5,
        shadowOffset: {
          height: 1,
          width: 0
        },
    },
    item: {
        padding: 5,
    },
})