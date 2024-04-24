import React, {useState, useRef, useCallback, useEffect} from 'react'
import { SafeAreaView, Text, Image, StyleSheet, Dimensions, useWindowDimensions, View, ScrollView, ImageBackground, Alert} from 'react-native'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import IconButton from '../../components/IconButton/IconButton'
import BottomSheet from '../../components/BottomSheet/BottomSheet'
import { getCategories, insertData} from '../../utils/firebase/Database'



import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const POPUP_HEIGHT = -SCREEN_HEIGHT * 0.45;

const SignUpScreen = ({route}) => {

const signUpType = route.params.isSupplier
const [business, setBusiness] = useState('');
const [description, setDesc] = useState('');
const [businessID, setBusinessID] = useState('');
const [email, setEmail] = useState('');
const [phoneNumber, setPhoneNumber] = useState('');
const [businessAddress, setBusinessAddress] = useState('');
const [shippingAddress, setShippingAddress] = useState('');
const [zip, setZip] = useState('');
const [iconURI, setIconURI] = useState('https://www.icoupons.co.il/wp-content/uploads/2021/08/%D7%AA%D7%A0%D7%95%D7%91%D7%94-1200x900.png');
const [bannerURI, setBannerURI] = useState('https://res.cloudinary.com/globes/image/upload/t_desktop_article_content_header_800%2A392/v1657615758/direct/%D7%9E%D7%A8%D7%9C%D7%95%D7%92_%D7%9E%D7%95%D7%93%D7%99%D7%A2%D7%99%D7%9F_%D7%AA%D7%A0%D7%95%D7%91%D7%94_jmgutt.jpg');
const [chosenCategory, setChosenCategory] = useState('');

// Category Component
const [cComponent, setCComponent] = useState();

// Ref for bottom sheet
const ref = useRef(null);

const navigation = useNavigation();

const onRegistration = () => {

    // TODO: Add validation if user exists

    const validated = validateInput();

    if (validated === true) {
        const profileDoc = {
            'name': business,
            'bid': businessID,
            'Category': chosenCategory,
            'Email': email,
            'Phone': phoneNumber,
            'Info': {
                'body': description,
                'imgUrl': iconURI,
                'title': business,
            },
            'banner': bannerURI,
            'icon': iconURI,
            'Items': {},
            'Zip': zip,
            'approvedBusinesses': ['admin'],
            'activeOrders': [],
            'orderHistory': [],
            'Address': businessAddress,
            'Shipping': shippingAddress
    
            }
        if (signUpType) {
            navigation.navigate('EditItemScreen', {'profileDoc': profileDoc, 'fromSignup': true})
        }
        else {
            // Don't Forget to apply new profile to database if not supplier
            insertData('customers', profileDoc.name, profileDoc);
            navigation.navigate('Marketplace')
        }
    }
    else {
        console.log('False')
    }
}

const validateInput = () => {
    const baseFieldsToValidate = [business, businessID, email, phoneNumber, description, iconURI, bannerURI, zip, businessAddress, shippingAddress]

    if (chosenCategory === '' && signUpType === true) {
        return false
    }

    for (let i = 0; i < baseFieldsToValidate.length; i++){
        if (baseFieldsToValidate[i] === '') {
            return false
        }
    }

    return true


    
}

useEffect(async () => {
    const categoryComponent = [];
    const categories = await getCategories();
    console.log(categories)
    categories.map(c => categoryComponent.push(constructComponent(c)))
    setCComponent(categoryComponent)

  }, [])

const constructComponent = (value) => {
    return (
        <CustomButton key={`${value}`} objWidth='100%' onPress={() => {onCategoryPress(value)}} text={value}/>)
    }

    // Category List
const onCategorySelect = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    }
    else {
      ref?.current?.scrollTo(POPUP_HEIGHT);
    }
  }, []);

  // Pick Category Func
const onCategoryPress = (value) => {
    setChosenCategory(value)
    onCategorySelect()
}

const onTermsofUse = () => {
    console.warn('Terms pressed')
}

const onPrivacy = () => {
    console.warn('Privacy pressed')
}
    return (
        <SafeAreaView style={{height: '100%'}}>
                <ImageBackground source={{uri: bannerURI}} style={{width: '100%', aspectRatio: 2.2,}} resizeMode='cover'>
                    <View style={styles.backgroundView}>
                        <Image source={{uri: iconURI}}style={{height: 125, width: 125}}/>
                    </View>
                </ImageBackground>
                <View style={{alignItems:'center', height:50}}>
                    <Text style={{fontSize: 22}}>&nbsp;{business}</Text>
                    <MaterialCommunityIcons name="basket" size={16}>{chosenCategory}</MaterialCommunityIcons>
                </View>
                <View style={{width: '100%', height: 1, backgroundColor: 'rgba(0,0,0, 0.07)'}}/>
            <View style={{height:'60%'}}>
            <ScrollView>
                <SafeAreaView style={styles.root}>
                    <CustomInput placeholder='Business Name' value={business} setValue={setBusiness}/>
                    <CustomInput placeholder='Business Description' value={description} setValue={setDesc}/>
                    <CustomInput placeholder='Business ID' value={businessID} setValue={setBusinessID}/>
                    <CustomInput placeholder='Business Phone Number' value={phoneNumber} setValue={setPhoneNumber}/>
                    <CustomInput placeholder='Email' value={email} setValue={setEmail}/>
                    <CustomInput placeholder='Business Address' value={businessAddress} setValue={setBusinessAddress}/>                    
                    <CustomInput placeholder='Shipping Address' value={shippingAddress} setValue={setShippingAddress}/>
                    <CustomInput placeholder='Zip Code' value={zip} setValue={setZip}/>
                    <CustomInput placeholder='Business URI Icon' value={iconURI} setValue={setIconURI}/>
                    <CustomInput placeholder='Business URI Banner' value={bannerURI} setValue={setBannerURI}/>
                    {signUpType ? <CustomButton text="Choose Category" onPress={onCategorySelect}/> : null}
                    <Text style={styles.text}>By registering, you confirm that you accept our 
                    <Text style={styles.link} onPress={onTermsofUse}> Terms of Use</Text> and 
                    <Text style={styles.link} onPress={onPrivacy}> Privacy</Text> Policy</Text>
                </SafeAreaView>
            </ScrollView>
            </View>
            <View style={styles.buttonView}>
                <View style={{width: '100%', height: 1, backgroundColor: 'rgba(0,0,0, 0.07)', marginTop: 20}}/>
                <CustomButton text={signUpType ? "Add Items" : "Join Vendor"} onPress={onRegistration} type='TERITARY'/>
            </View>
            <BottomSheet key={'signupSheet_0'} ref={ref}>
                <View style={{height:'100%', alignItems:'center'}}>
                <Text style={styles.sheetTitle}>Business Specialization</Text>
                <Text style={styles.sheetSuptitle}>Pick one</Text>
                <View style={{width: '100%', height: 1, backgroundColor: 'rgba(0,0,0, 0.2)', marginTop: 5}}/>

                    <View style={{height:'22%', width:'80%'}}>
                        <ScrollView>
                            {cComponent}
                        </ScrollView>
                    </View>

                    <View style={{width: '100%', height: 1, backgroundColor: 'rgba(0,0,0, 0.2)'}}/>
                </View>
            </BottomSheet>
        </SafeAreaView>
        
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
        backgroundView: {
        position: 'absolute',
        justifyContent:'center',
        alignSelf:'center',
        height: 125,
        width: 125,
        top:50,
        borderRadius: 75,
        overflow: 'hidden',
        marginLeft: 20,
        borderWidth: 1,
        borderColor: '#aaa',
    },
    middleView: {
        marginLeft: 130,
        marginTop: 5,
        
    },
    image:{
        width: '100%',
        height: '50%',
        borderWidth: 10,
    },
    buttonView: {
        width: '100%',
        bottom:0,
        position:'absolute',
        justifyContent:'center',
        alignItems:'center',
    },
    profileButton: {
        position:'absolute',
        alignSelf:'center',
        bottom: 10,
    },
    sheetTitle: {
        color: 'black',
        marginLeft: 15,
        fontSize: 22,
      },
    sheetSuptitle: {
        color: 'gray',
        marginLeft: 15,
        fontSize: 16,
      },
});

export default SignUpScreen