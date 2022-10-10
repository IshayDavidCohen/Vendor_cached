import { View, Text, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Image} from 'react-native'
import React, {useState, useEffect, useCallback, useRef} from 'react'

import { PopulateProfile } from '../Marketplace/Populate';
import SlideWidget from '../../components/SlideWidget/SlideWidget'
import BottomSheet from '../../components/BottomSheet/BottomSheet'
import CounterWidget from '../../components/CounterWidget/CounterWidget';
import CustomButton from '../../components/CustomButton/CustomButton';

// TODO: Take care of price in currency to unit

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const POPUP_HEIGHT = -SCREEN_HEIGHT * 0.45;

const Profile = ({route, navigation}) => {
  const ref = useRef(null);
  const [itemPressed, setItemPressed] = useState({});
  const [count, setCount] = useState('0');

  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();

    if (isActive) {
      ref?.current?.scrollTo(0);
    }
    else {
      ref?.current?.scrollTo(POPUP_HEIGHT);
    }
  }, []);

  const [profileProps, setProfileProps] = useState([]);

  useEffect(async () => {
    console.log('rendered')
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
  console.log(count);
  return (
    <SafeAreaView>
      <TouchableOpacity activeOpacity={1} onPress={() => {
        if (ref?.current?.isActive()) {
          onPress()
        }
        }}>
        <Text>Store Name</Text>
        <Text>Overall</Text>
        <Text>Shipping Time</Text>
        <Text>Shipping Quantity</Text>
        <Text>Price</Text>
      </TouchableOpacity>
      {profileProps}

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
            <CustomButton text={`Cart | ${itemPressed.Price * count}`}/>
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
})

export default Profile