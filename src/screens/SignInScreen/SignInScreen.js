import React, {useState} from 'react'
import { SafeAreaView, Text, Image, StyleSheet, useWindowDimensions, View, ScrollView} from 'react-native'
import Logo from '../../../assets/images/placeholder-login.png'

import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import SocialSignInButton from '../../components/SocialSignInButton'
import { useNavigation } from '@react-navigation/native'

const SignInScreen = () => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
    
const {height} = useWindowDimensions();
const navigation = useNavigation();

const onSignInPressed = () => {
    // validate user
    navigation.navigate('Home');
}

const onForgotPasswordPressed = () => {
    navigation.navigate('ResetPassword');
}

const onSignUp = () => {
    navigation.navigate('SignUp');
}
    return (
        <ScrollView>
            <SafeAreaView style={styles.root}>
                <Image source={Logo}
                style={[styles.logo, {height: height * 0.3}]} 
                resizeMode='contain'/>
                
                <CustomInput placeholder='Username' value={username} setValue={setUsername}/>
                <CustomInput placeholder='Password' value={password} setValue={setPassword} secureTextEntry={true}/>
                
                <CustomButton text='Sign In' onPress={onSignInPressed}/>
                <CustomButton text='Forgot Password?' onPress={onForgotPasswordPressed} type='TERITARY'/>
            
                <SocialSignInButton/>
                <CustomButton text="Don't have an account? Create one" onPress={onSignUp} type='TERITARY'/>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 150,
    },
});

export default SignInScreen