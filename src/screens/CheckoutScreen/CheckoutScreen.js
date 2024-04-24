import { SafeAreaView, Text, View, Image, StyleSheet} from 'react-native'
import React, { useRef, useState} from 'react'
import CustomButton from '../../components/CustomButton/CustomButton';
import Toast from '../../components/Toast/Toast';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { getState } from '../../components/GlobalParams/GlobalParams';
import { sendOrders } from '../../utils/functions/functions';
import Logo from '../../../assets/images/checkoutScreenImg.png';



const CheckoutScreen = ({route, navigation}) => {
  const [showAnimation, setShowAnimation] = useState(false);

  const { userParams, setUserParams } = getState();

  const initOrder = () => {
    console.log(userParams)
    const dateObj = new Date();
    const dateStamp = String(dateObj.getDate()).padStart(2, '0') + '/' + String(dateObj.getMonth() + 1).padStart(2, '0') + '/' + dateObj.getFullYear();
    const hourStamp = String(dateObj.getHours()) + ':' + String(dateObj.getMinutes()) + ':' + String(dateObj.getSeconds()).padStart(2, '0')

    sendOrders(userParams['cart'], userParams.user.name, dateStamp, hourStamp, userParams.user.Shipping, cost)

    toastRef.current.show()
    navigation.navigate("Marketplace")
  }

  const toastRef = useRef(null);
  const Items = route.params.items
  const Summary = route.params.summary
  const cost = route.params.cost
  return (
    <SafeAreaView>
        <View style={{alignItems: 'center', height:'100%'}}>
            <Image style={{width:'100%', height: 300, resizeMode:'stretch'}} source={Logo}/>
            <View style={{width:'100%', backgroundColor:'#d9ebf7', height:50, borderBottomRightRadius:5, borderBottomLeftRadius:5, justifyContent:'center', flexDirection:'row', flexGrow:'grow'}}>

              <View style={{justifyContent:'center', alignContent:'center', alignSelf:'center', alignItems:'center'}}>
                <MaterialCommunityIcons name={'home'} color='#469BDA' size={25}/>
                <Text>{userParams.user.name}</Text>
              </View>

              <View style={styles.verticalLine}/>

              <View style={{justifyContent:'center', alignItems:'center'}}>
                <MaterialCommunityIcons style={{alignSelf:'center'}} name={'clock'} color='#469BDA' size={25}/>
                <Text>undefined</Text>
              </View>

              <View style={styles.verticalLine}/>

              <View style={{justifyContent:'center'}}>
                <MaterialCommunityIcons style={{alignSelf:'center'}} name={'truck'} color='#469BDA' size={25}/>
                <Text>{userParams.user.Shipping}</Text>
              </View>

              <View style={styles.verticalLine}/>

              <View style={{justifyContent:'center'}}>
                <MaterialCommunityIcons style={{alignSelf:'center'}} name={'cash'} color='#469BDA' size={25}/>
                <Text>{cost}</Text>
              </View>
            </View>
            <Toast text='Order Sent' subtext='Details sent to the corresponding suppliers!' icon='truck' ref={toastRef}/>
            <View style={{bottom: 20, position: 'absolute', width: '80%', alignItems:'center'}}>
              <CustomButton onPress={initOrder} text={'Complete Order'} bgColor="#d9ebf7" fgColor="#469BDA" />
            </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  verticalLine: {
    height: '85%',
    width: 1,
    marginHorizontal:15,
    alignSelf:'center',
    justifyContent:'center',
    backgroundColor: 'rgba(0,0,0, 0.1)',
  },
})

export default CheckoutScreen