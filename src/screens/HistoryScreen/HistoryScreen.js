import { View, Text, SafeAreaView} from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import CustomButton from '../../components/CustomButton/CustomButton';

const HistoryScreen = ({navigation, route}) => {
    const historyData = route.params.historyData

    const noDataScreen = () => {
        return (
            <View style={{height:'100%', alignItems:'center', justifyContent:'center'}}>
                <View style={{alignItems:'center'}}>
                    <MaterialCommunityIcons name={'package-variant'} color='black' size={60}/>
                    <Text style={{fontSize: 28}}>
                        No Orders Completed
                    </Text>
                </View>
            </View>
        )
    }

    const ScreenContent = () => {
        return (
            <View>
                <Text>
                    Stuff
                </Text>
            </View>
        )
    }

  return (
    <SafeAreaView>
        {historyData ? ScreenContent() : noDataScreen()}
        <View>
        <View style={{position:'absolute', bottom:0, width:'100%',backgroundColor: 'rgba(240,240,240, 1)', alignItems:'center', justifyContent:'center'}}>
            <View style={{width: '100%', height: 1, backgroundColor: 'rgba(0,0,0, 0.1)', marginBottom: 5}}/>
                <CustomButton text="Back" onPress={() => {navigation.goBack()}} type='TERITARY'/>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default HistoryScreen