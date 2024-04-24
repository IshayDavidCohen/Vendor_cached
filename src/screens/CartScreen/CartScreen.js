import { View, Text, SafeAreaView } from 'react-native'
import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native';
import { getState } from '../../components/GlobalParams/GlobalParams'
import { SumMatrix } from '../../utils/functions/functions';
import ItemSummary from '../../components/ItemSummary';
import CustomButton from '../../components/CustomButton/CustomButton';

import Toast from '../../components/Toast/Toast';


//** Description:
// Cart screen includes all of the items added to the cart.
// A few requirements: 
// 1. A supplier might decline an order, thus orders needs to be sent to the supplier for acceptance (Phase 3+)
// 2. Data format: 
// [{item_details, supplier}, {..}]
// 3. Populate based on amount of data
// Each item might have a different supplier, thus 
const CartScreen = () => {
  const navigation = useNavigation();

  const NavigateCheckout = () => {
    navigation.navigate('Checkout', {'items': userParams, 'summary': Summary, 'cost': matrixSum})
  }

  const { userParams, setUserParams } = getState();
  const [ Summary, setSummary] = useState({});
  const matrixSum = Object.values(Summary).length > 0 ? SumMatrix(Object.values(Summary)) : 0
  return (
    <SafeAreaView>
      <Text style={{color: '#3B71F3', fontSize: 24, alignSelf: 'center', marginTop: 10}}> CART </Text>
      <View style={{height: '95%'}}>
        <ItemSummary data={userParams} setSummary={setSummary}/>
        <View style={{alignItems: 'center', marginBottom: 20}}>

        <CustomButton onPress={NavigateCheckout} text={`Checkout | ${matrixSum}`} bgColor="#d9ebf7" fgColor="#469BDA" />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default CartScreen