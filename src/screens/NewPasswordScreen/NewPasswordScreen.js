import React, {useState} from 'react'
import { SafeAreaView, Text, Image, StyleSheet, useWindowDimensions, View, ScrollView} from 'react-native'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import { useNavigation } from '@react-navigation/native'

const NewPasswordScreen = () => {
const [code, setCode] = useState('');
const [newPassword, setNewPassword] = useState('');   

const navigation = useNavigation();

const onSubmit = () => {
    navigation.navigate('SignIn');
}

const onBackToSignIn = () => {
    navigation.navigate('SignIn');
}
    return (
        <ScrollView>
            <SafeAreaView style={styles.root}>
                <Text style={styles.title}>Enter the code</Text>
        
                <CustomInput placeholder='Code' value={code} setValue={setCode}/>
                <CustomInput placeholder={'Enter your new password'} value={newPassword} setValue={setNewPassword}/>                
                <CustomButton text='Submit' onPress={onSubmit}/>
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

export default NewPasswordScreen