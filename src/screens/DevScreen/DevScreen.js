import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, LogBox} from 'react-native'
import CustomButton from '../../components/CustomButton/CustomButton'
import { useNavigation } from '@react-navigation/native'
import { getState } from '../../components/GlobalParams/GlobalParams'
import { getProfile } from '../../utils/firebase/Database'
import React, { useEffect, useState } from 'react'




const DevScreen = () => {
    const navigation = useNavigation();

    const { userParams, setUserParams } = getState();
    const [Loaded, setLoaded] = useState(false);
    const [supplierList1, setSupplierList] = useState([]);
    const [customerList1, setCustomerList] = useState([]);
    console.log(userParams)

    const SignInAsUser = async (dbSection, user) => {
        // Sign In as User and Pass Params to global params
        const userData = await getProfile(dbSection, user)
        userParams['user'] = userData
        setUserParams({...userParams});
        navigation.navigate('Marketplace');
    }

    const AddSupplier = () => {
        navigation.navigate('SignUp', {'isSupplier': true});
    }

    const AddCustomer = () => {
        navigation.navigate('SignUp', {'isSupplier': false})
    }

    useEffect( async () => {
        setSupplierList(await getProfile('profiles'));
        setCustomerList(await getProfile('customers'));
    }, [])

    const supplierList = ['Tnuva', 'Tara', 'Garofalo', 'Osem']
    const customerList = ['Avi', 'Beni', 'Gadi']


    if (Loaded === false) {
        setLoaded(true);
    }

    console.log(supplierList1);
    console.log(customerList1);

    const createUserButton = (dbSection, user) => {
        return (
            <View style={styles.viewContainer}>
                <TouchableOpacity onPress={() => {SignInAsUser(dbSection, user)}}>
                    <Text style={styles.viewText}>
                        {user}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    const createUsers = (dbSection, userList) => {
        return (
            <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                {userList.map(user => {return createUserButton(dbSection, user)})}
            </View>
        )
    }

  return (
    <SafeAreaView>
        <View style={{borderWidth:1, alignItems:'center', height:'100%'}}>
            <View style={{alignItems:'center', height:'50%'}}>
                <Text>Suppliers</Text>
                <View style={{margin: 20}}>
                    {createUsers('profiles', supplierList)}
                </View>
            </View>
            <View style={{width: '80%', height: 1, backgroundColor: 'rgba(0,0,0, 0.1)', marginBottom: 10, marginTop: 10}}/>
            <View style={{alignItems:'center'}}>
                <Text>Customers</Text>
                <View style={{margin: 20}}>
                    {createUsers('customers', customerList)}
                </View>
            </View>
        </View>
        <View style={{position:'absolute', bottom:0, marginBottom:10}}>
            <View style={{width: '100%', height: 1, backgroundColor: 'rgba(0,0,0, 0.07)', marginBottom: 10}}/>
            <View style={styles.buttonLayout}>
                <View style={styles.buttonView}>
                    <CustomButton onPress={AddSupplier} text={'Add Supplier'} bgColor="#d9ebf7" fgColor="#469BDA" />
                </View>
                <View style={styles.buttonView}>
                    <CustomButton onPress={AddCustomer} text={'Add Customer'} bgColor="#d9ebf7" fgColor="#469BDA" />
                </View>
            </View>
        </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    horizontalLine: {
        height: 1,
        width: '80%',
        backgroundColor: 'rgba(0,0,0, 0.3)',
      },
    buttonView: {
        width: '50%',
        alignItems:'center',
    },
    buttonLayout: {
        justifyContent:'center',
        flexDirection: 'row',
    },
    viewContainer: {
        backgroundColor: '#d9ebf7',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 5,
        padding: 7,
        marginRight: 30, // Distance from edge of screen
      },
      viewText: {
        fontSize: 12,
        color: '#469BDA',
        fontWeight: 'normal',
      }
});

export default DevScreen