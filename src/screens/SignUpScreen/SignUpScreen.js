import React, {useState} from 'react'
import { SafeAreaView, Text, Image, StyleSheet, useWindowDimensions, View, ScrollView} from 'react-native'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'

const SignUpScreen = () => {
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [address, setAddress] = useState('');
const [bn, setBn] = useState('');
const [phoneNumber, setPhoneNumber] = useState('');
const [zip, setZip] = useState('');
    
const onSignUp = () => {
    console.warn('Sign up function')
}

const onMoveToSignIn = () => {
    console.warn('Move To Sign In Function')
}

const onTermsofUse = () => {
    console.warn('Terms pressed')
}

const onPrivacy = () => {
    console.warn('Privacy pressed')
}
    return (
        <ScrollView>
            <SafeAreaView style={styles.root}>
                <Text style={styles.title}>Create an account</Text>
        
                <CustomInput placeholder='Username' value={username} setValue={setUsername}/>
                <CustomInput placeholder='Email' value={email} setValue={setEmail}/>
                <CustomInput placeholder='Password' value={password} setValue={setPassword} secureTextEntry={true}/>
                <CustomInput placeholder='Confirm Password' value={confirmPassword} setValue={setConfirmPassword} secureTextEntry={true}/>
                <CustomInput placeholder='Business Address' value={address} setValue={setAddress}/>
                <CustomInput placeholder='Business Number' value={bn} setValue={setBn}/>
                <CustomInput placeholder='Business Phone Number' value={phoneNumber} setValue={setPhoneNumber}/>
                <CustomInput placeholder='Zip Code' value={zip} setValue={setZip}/>
                <CustomButton text='Create account' onPress={onSignUp}/>

                <Text style={styles.text}>By registering, you confirm that you accept our 
                <Text style={styles.link} onPress={onTermsofUse}> Terms of Use</Text> and 
                <Text style={styles.link} onPress={onPrivacy}> Privacy</Text> Policy</Text>

                <CustomButton text="Have an account? Sign In" onPress={onMoveToSignIn} type='TERITARY'/>
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

export default SignUpScreen