import { View, Text, SafeAreaView, ScrollView} from 'react-native'
import React, {useState, useEffect} from 'react'
import CustomButton from '../../components/CustomButton/CustomButton'
import { useNavigation } from '@react-navigation/native'
import PopulateMarket from './Populate'


const Marketplace = () => {

  const navigation = useNavigation();
  const [marketData, setMarketData] = useState([]);
  useEffect(async () => {
    setMarketData(await PopulateMarket());
    console.log("Marketplace rendered")
  }, [setMarketData])
  const onSignIn = () => {
    navigation.navigate('SignIn');
  }
  
    return (
      <SafeAreaView>
        <Text style={{fontSize: 24, alignSelf: 'center', textAlign: 'center'}}>Vendor{"\n"}</Text>
        <ScrollView>
          {marketData}
        </ScrollView>
        <CustomButton text='Back to Sign in [Temporary]' onPress={onSignIn} type='TERITARY'/>
      </SafeAreaView>
    )
}

export default Marketplace