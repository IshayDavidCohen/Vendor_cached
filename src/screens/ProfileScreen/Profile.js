import { View, Text, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Image, ImageBackground, ScrollView} from 'react-native'
import React, {useState, useEffect, useCallback, useRef} from 'react'

import { PopulateProfile } from '../Marketplace/Populate';
import SlideWidget from '../../components/SlideWidget/SlideWidget'
import BottomSheet from '../../components/BottomSheet/BottomSheet'
import CounterWidget from '../../components/CounterWidget/CounterWidget';
import CustomButton from '../../components/CustomButton/CustomButton';
import Ratings from '../../components/Ratings';
import { getState } from '../../components/GlobalParams/GlobalParams';
import { addItem } from '../../utils/functions/functions';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { getProfileInfo } from '../../utils/firebase/Database';

// TODO: Take care of price in currency to unit
// BUG: When using Bottom sheet and increasing item quantity if it is 0 and a character is pressed the total is turned into NaN

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const POPUP_HEIGHT = -SCREEN_HEIGHT * 0.45;

const Profile = ({route, navigation}) => {
  // Reference for BottomSheet
  const ref = useRef(null);

  const [Loaded, setLoaded] = useState(false);

  useEffect(async () => {

    const Info = await getProfileInfo(route.params.storeName);
    setBanner(Info['banner'])
    setIcon(Info['icon'])
    setAddress(Info['Address'])

  }, [Loaded])

  if (Loaded === false) {
    setLoaded(true);
  }

  // States
  const [itemPressed, setItemPressed] = useState({});
  const [count, setCount] = useState('0');
  const [rating, setRatings] = useState(0);
  const [profileProps, setProfileProps] = useState([]);

  const [banner, setBanner] = useState('https://media.istockphoto.com/id/1335247217/nl/vector/loading-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=0OXEMa4Xx-Ks33Z55gt6uNmweNfpfT0imyHFWMwCY1E=');
  const [icon, setIcon] = useState('https://media.istockphoto.com/id/1335247217/nl/vector/loading-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=0OXEMa4Xx-Ks33Z55gt6uNmweNfpfT0imyHFWMwCY1E=');
  const [Address, setAddress] = useState('');

  const { userParams, setUserParams } = getState();

  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    }
    else {
      ref?.current?.scrollTo(POPUP_HEIGHT);
    }
  }, []);

  useEffect(async () => {
    let props = [];
    const data = await PopulateProfile(route.params.storeName);
    
    Object.entries(data).map(([k, v]) => {
      props.push(
        <Text key={`${k}_0`} style={{fontSize: 18, fontWeight: 'bold', color: '#051C60', margin: 10}}>{k}</Text>,
        <SlideWidget key={`${k}_1`} data={v} onPress={() => {onPress()}} pressResponse={itemPressed} setPressResponse={setItemPressed}/>
      )
    })
    setProfileProps(props);
    // Performance Comment: In order to detect if user is clicking the same item, itemPressed is a dependency.
    // Might be a performance problem in the future.
  }, [PopulateProfile, setItemPressed, itemPressed])

  return (
    <SafeAreaView>
                  <ImageBackground source={{uri: banner}} style={{width: '100%', aspectRatio: 1.6,}} resizeMode='cover'>
                <View style={styles.backgroundView}>
                    <Image source={{uri: icon}}style={{height: 100, width: 100}}/>
                </View>
            </ImageBackground>

            <View style={styles.middleView}>
                <MaterialCommunityIcons name={'map-marker'} color='black' size={22}>
                    <Text style={{fontSize: 15, color: 'black'}}>{Address}</Text>
                </MaterialCommunityIcons>
                <MaterialCommunityIcons name={'shopping'} color='black' size={22}>
                    <Text style={{fontSize: 15, color: 'black'}}> 189 Daily Sales</Text>
                </MaterialCommunityIcons>
            </View>

            <View style={{width: '100%', height: 1, backgroundColor: 'rgba(0,0,0, 0.07)', marginTop: 10}}/>
      {/* <TouchableOpacity activeOpacity={1} onPress={() => {
        if (ref?.current?.isActive()) {
          onPress()
        }
        }}>
        <Ratings text='Shipping'/>
        <Ratings text='Product  '/>
      </TouchableOpacity> */}

      <ScrollView>
        {profileProps}
      </ScrollView>

      <BottomSheet key={'profileSheet_0'} ref={ref}>
          <Text style={styles.title}>Add to Cart</Text>
          <Text style={styles.suptitle}>Set the required amount</Text>
          <View style={{paddingBottom: 15}}/>
          <View style={styles.containerProperties}>
            <Image source={{uri: itemPressed.imgUrl}} style={styles.image}/> 
            <Text style={styles.imageTitle}>{itemPressed.title}{'\n'}
              <Text style={styles.imageSuptitle}>{itemPressed.Price}$/{itemPressed.Item_unit}</Text>
            </Text>
            <CounterWidget count={count} setCount={setCount}/>
          </View>
          <View style={{width: '100%', alignSelf: 'center', alignItems: 'center', paddingTop: 15}}>
            <CustomButton text={`Cart | ${itemPressed.Price * count}`} onPress={() => {if (count > 0) {
              addItem(route.params.storeName, itemPressed, count, userParams, setUserParams);
              setCount('0');
            }}}/>
          </View>
      </BottomSheet>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    color: 'black',
    marginLeft: 15,
    fontSize: 22,
  },
  suptitle: {
    color: 'gray',
    marginLeft: 15,
    fontSize: 16,
  },
  image:{
    width: 56,
    height: 56,
    marginLeft: 15,
    resizeMode: 'contain',
    
    borderRadius: 56 / 2,
    borderWidth: 2,
    borderColor: "#EEEEEE",

    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      height: 10,
      width: 10
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
  containerProperties: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 10,
  },
  imageTitle: {
    fontSize: 14,
    paddingHorizontal: 5,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 10,
  },
  imageSuptitle: {
    fontSize: 12,
    color: 'gray',
  },
  backgroundView: {
    position: 'absolute',
    bottom: -50,
    height: 100,
    width: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginLeft: 20,
    borderWidth: 1,
    borderColor: '#aaa',
},
middleView: {
    marginLeft: 130,
    marginTop: 5,
    
},
icon:{
    width: '100%',
    height: '50%',
    borderWidth: 10,
},
})

export default Profile