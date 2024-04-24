import { SafeAreaView, Text, Image, StyleSheet, useWindowDimensions, View, ScrollView, TouchableOpacity} from 'react-native'
import React, {useState, useEffect} from 'react'

import CustomInput from '../../components/CustomInput/CustomInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import { getCategories, getStoreNames } from '../../utils/firebase/Database'
import ViewList from '../../components/ViewList/ViewList'
import { populateSearch } from '../Marketplace/Populate'
import { useNavigation } from '@react-navigation/native'
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'


const SearchScreen = () => {

  const navigation = useNavigation();

  const matchSearch = () => {
    if (searchInfo !== undefined && searchInfo.storeNames.length > 0 && searchQuery !== undefined && searchQuery !== '') {
      const re = RegExp(`.*${searchQuery.toLowerCase().split('').join('.*')}.*`)
      setQuery({'categories': searchInfo['searchCategories'].filter(v => v.toLowerCase().startsWith(searchQuery.toLowerCase())),
      'storeNames': searchInfo['storeNames'].filter(v => v.toLowerCase().startsWith(searchQuery.toLowerCase()))}) 
    }
  }

    const [searchQuery, setSearchQuery] = useState('');
    const {height} = useWindowDimensions();
    const [searchInfo, setSearchInfo] = useState([]);
    const [stores, setStores] = useState();
    const [query, setQuery] = useState({});
    const [viewData, setViewData] = useState();

    const [Loaded, setLoaded] = useState(false);

    const navigate = (path) => {
      navigation.navigate('Profile', {'storeName': path})
    }

    useEffect(async () => {
      setSearchInfo({'searchCategories': await getCategories(), 'storeNames': await getStoreNames()})

      // Get search data
      const data = await populateSearch();

      // Filter search data to fit ViewList component
      if (data !== undefined) {
        setStores(data);
        setViewData(Object.values(data));
      }
    }, [Loaded])

    // Filter viewList by character

    useEffect(() => {
      matchSearch()
      console.log(query)
      if (searchQuery !== undefined && query !== undefined) {
        if (searchQuery.length > 0) {
          setViewData([...query.storeNames.map(key => {return stores[key]})])
        }
        else {
          setViewData([...Object.values(stores)])
        }
    }
    }, [searchQuery])


    if (Loaded === false) {
      setLoaded(true);
    }

  return (
    <SafeAreaView style={styles.root}>
      <View style={{width:'100%', alignItems:'center', marginTop: 10}}>
        <CustomInput placeholder='Search' value={searchQuery} setValue={setSearchQuery}/>
        <View style={{width: '100%', height: 1, backgroundColor: 'rgba(0,0,0, 0.07)', marginTop: 10}}/>
        {/* <Text>Cat: {searchInfo['searchCategories']}</Text>
        <Text>Name: {searchInfo['storeNames']}</Text>
        <Text>{query['categories']}</Text>
        <Text>{query['storeNames']}</Text> */}
      </View>
      <View style={{width:'100%', height:'100%'}}>
        <ViewList data={viewData} onPress={navigate} type='SINGLE'/>
      </View>
</SafeAreaView>
  )
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

export default SearchScreen