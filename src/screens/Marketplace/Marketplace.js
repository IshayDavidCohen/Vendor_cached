import { View, Text, SafeAreaView} from 'react-native'
import React from 'react'
import CustomButton from '../../components/CustomButton/CustomButton'
import SlideWidget from '../../components/SlideWidget/SlideWidget'
import { useNavigation } from '@react-navigation/native'


const Marketplace = () => {

const navigation = useNavigation();

const onSignIn = () => {
  navigation.navigate('SignIn');
}

  return (
    <SafeAreaView>
      <Text style={{fontSize: 24, alignSelf: 'center', textAlign: 'center'}}>Home Screen{"\n"} Under Development.</Text>
      <CustomButton text='Back to Sign in [Temporary]' onPress={onSignIn} type='TERITARY'/>
      <SlideWidget/>
    </SafeAreaView>
  )
}

export default Marketplace