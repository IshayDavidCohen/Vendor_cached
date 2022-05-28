import React from 'react'
import CustomButton from '../CustomButton/CustomButton'

const onSignInGoogle = () => {
    console.warn('Sign In Google');
}
const onSignInApple = () => {
    console.warn('Sign In Apple');
}

const SocialSignInButton = () => {
  return (
    <>
        <CustomButton text='Sign In with Google' onPress={onSignInGoogle} bgColor="#FAE9EA" fgColor="#DD4D44" />
        <CustomButton text='Sign In with Apple' onPress={onSignInApple} bgColor="#e3e3e3" fgColor="#363636"/>
    </>
  )
}

export default SocialSignInButton