import { View, Text, Image, StyleSheet, ImageBackground, ScrollView, TouchableOpacity} from 'react-native'
import React, { useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native'
import { getProfile } from '../../utils/firebase/Database';
import HistoryScreen from '../HistoryScreen/HistoryScreen';



const SettingsScreen = () => {
    const navigation = useNavigation();

    const [profileDocument, setProfileDocument] = useState(); 
    useEffect(async () => {
        setProfileDocument(await getProfile('profiles', 'Tnuva'));
    }, [])

    //console.log(profileDocument)

    const NavToHistory = () => {
        navigation.navigate('HistoryScreen', {'historyData': profileDocument['orderHistory']})
    }

    const NavToEdit = () => {
        // Stitch pulling info based on which user I am
        navigation.navigate('EditItemScreen', {'profileDoc': profileDocument});
    }
  return (
    <SafeAreaView>
            <ImageBackground source={{uri: 'https://res.cloudinary.com/globes/image/upload/t_desktop_article_content_header_800%2A392/v1657615758/direct/%D7%9E%D7%A8%D7%9C%D7%95%D7%92_%D7%9E%D7%95%D7%93%D7%99%D7%A2%D7%99%D7%9F_%D7%AA%D7%A0%D7%95%D7%91%D7%94_jmgutt.jpg'}} style={{width: '100%', aspectRatio: 1.6,}} resizeMode='cover'>
                <View style={styles.backgroundView}>
                    <Image source={{uri: 'https://www.icoupons.co.il/wp-content/uploads/2021/08/%D7%AA%D7%A0%D7%95%D7%91%D7%94-1200x900.png'}}style={{height: 100, width: 100}}/>
                </View>
            </ImageBackground>

            <View style={styles.middleView}>
                <MaterialCommunityIcons name={'map-marker'} color='black' size={22}>
                    <Text style={{fontSize: 15, color: 'black'}}>Glil Yam, Tel Aviv</Text>
                </MaterialCommunityIcons>
                <MaterialCommunityIcons name={'shopping'} color='black' size={22}>
                    <Text style={{fontSize: 15, color: 'black'}}> 189 Daily Sales</Text>
                </MaterialCommunityIcons>
            </View>

            <View style={{width: '100%', height: 1, backgroundColor: 'rgba(0,0,0, 0.07)', marginTop: 10}}/>
            <View style={{width: '100%', alignItems: 'center', marginTop: 15,}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex:1, justifyContent:'space-between', alignItems:'center'}}>
                        <MaterialCommunityIcons style={{alignSelf:'center'}} name={'truck'} color='black' size={22}/>
                        <Text style={{fontSize: 15, color: 'black'}}>Shipping</Text>
                    </View>
                    <View style={{flex:1, justifyContent:'space-between', alignItems:'center'}}>
                        <MaterialCommunityIcons style={{alignSelf:'center'}} name={'book'} color='black' size={22}/>
                        <Text style={{fontSize: 15, color: 'black'}}>Pending Orders</Text>
                    </View>
                    <View style={{flex:1, justifyContent:'space-between', alignItems:'center'}}>
                        <MaterialCommunityIcons style={{alignSelf:'center'}} name={'calendar'} color='black' size={22}/>
                        <Text style={{fontSize: 15, color: 'black'}}>Calendar</Text>
                    </View>
                    <View style={{flex:1, justifyContent:'space-between', alignItems:'center'}}>
                        <MaterialCommunityIcons style={{alignSelf:'center'}} name={'information'} color='black' size={22}/>
                        <Text style={{fontSize: 15, color: 'black'}}>Support</Text>
                    </View>
                </View>
                <CustomButton text='Edit Store' type='OVAL' fgColor="#8B8E91" objWidth='80%' onPress={NavToEdit}/>
                <View style={{width: '100%', height: 1, backgroundColor: 'rgba(0,0,0, 0.15)', marginHorizontal: 20, marginTop: 10}}/>
            </View>

            <ScrollView>
                <TouchableOpacity style={{marginVertical: 10, marginHorizontal: 25, flexDirection: 'row', justifyContent: 'space-between'}} onPress={NavToHistory}>
                    <MaterialCommunityIcons name={'book'} color='black' size={25}>
                        <Text style={{fontSize: 18, color: 'black'}}>Order history</Text>
                    </MaterialCommunityIcons>
                    <MaterialCommunityIcons style={{alignSelf: 'flex-end', marginRight: 10}} name={'chevron-right'} color='black' size={25}/>

                </TouchableOpacity>

                <View style={{width: '90%', height: 1, backgroundColor: 'rgba(0,0,0, 0.15)', marginHorizontal: 20, marginTop: 10}}/>
                <TouchableOpacity style={{marginVertical: 10, marginHorizontal: 25, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <MaterialCommunityIcons name={'credit-card-multiple-outline'} color='black' size={25}>
                            <Text style={{fontSize: 18, color: 'black'}}>Payment options</Text>
                        </MaterialCommunityIcons>
                        <MaterialCommunityIcons style={{alignSelf: 'flex-end', marginRight: 10}} name={'chevron-right'} color='black' size={25}/>

                    </TouchableOpacity>
                    
                <View style={{width: '90%', height: 1, backgroundColor: 'rgba(0,0,0, 0.15)', marginHorizontal: 20, marginTop: 10}}/>
                <TouchableOpacity style={{marginVertical: 10, marginHorizontal: 25, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <MaterialCommunityIcons name={'handshake'} color='black' size={25}>
                            <Text style={{fontSize: 18, color: 'black'}}>Handshakes</Text>
                        </MaterialCommunityIcons>
                        <MaterialCommunityIcons style={{alignSelf: 'flex-end', marginRight: 10}} name={'chevron-right'} color='black' size={25}/>
                    </TouchableOpacity>

                <View style={{width: '90%', height: 1, backgroundColor: 'rgba(0,0,0, 0.15)', marginHorizontal: 20, marginTop: 10}}/>
            </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
    image:{
        width: '100%',
        height: '50%',
        borderWidth: 10,
    },
})

export default SettingsScreen