import React, {useState} from 'react'
import { SafeAreaView, Text, Image, StyleSheet, useWindowDimensions, View, ScrollView} from 'react-native'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import { useNavigation } from '@react-navigation/native'

const ResetPasswordScreen = () => {
const [username, setUsername] = useState('');
    
const navigation = useNavigation();

const onSend = () => {
    navigation.navigate('NewPassword');
}

const onBackToSignIn = () => {
    navigation.navigate('SignIn');
}
    return (
        <ScrollView>
            <SafeAreaView style={styles.root}>
                <Text style={styles.title}>Reset your password</Text>
        
                <CustomInput placeholder='Username' value={username} setValue={setUsername}/>                
                <CustomButton text='Send' onPress={onSend}/>
                <CustomButton text='Back to Sign in' onPress={onBackToSignIn} type='TERITARY'/>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    text:{
        width: '80%',
        color: 'gray',
        marginVertical: 10,
    },
    link: {
        color: '#FDB075'
    },
});

export default ResetPasswordScreen