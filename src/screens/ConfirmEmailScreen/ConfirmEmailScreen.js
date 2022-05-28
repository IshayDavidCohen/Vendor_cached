import React, {useState} from 'react'
import { SafeAreaView, Text, Image, StyleSheet, useWindowDimensions, View, ScrollView} from 'react-native'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'

const ConfirmEmailScreen = () => {
const [code, setCode] = useState('');
    
const onConfirm = () => {
    console.warn('Confirmed Function')
}

const onResend = () => {
    console.warn('Resend function')
}

const onBackToSignIn = () => {
    console.warn('Back to sign in function')
}
    return (
        <ScrollView>
            <SafeAreaView style={styles.root}>
                <Text style={styles.title}>Confirm your email</Text>
        
                <CustomInput placeholder='Authentication Code' value={code} setValue={setCode}/>                
                <CustomButton text='Confirm' onPress={onConfirm}/>
                <CustomButton text='Resend code' onPress={onResend} type='SECONDARY'/>
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

export default ConfirmEmailScreen