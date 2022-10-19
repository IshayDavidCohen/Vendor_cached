import { SafeAreaView} from 'react-native'
import { useState, useEffect } from 'react'
import React from 'react'
import ViewList from '../../components/ViewList/ViewList'
import { getViewData} from '../../utils/firebase/Database'


const ViewScreen = ({route, navigation}) => {

  const navigate = (path) => {
    navigation.navigate('Profile', {'storeName': path})
  }

  const [viewData, setViewData] = useState([]);
  useEffect(async () => { setViewData(await getViewData(route.params.category)); }, [setViewData] );
  return (
    <SafeAreaView>
      <ViewList data={viewData} onPress={navigate} type='SINGLE'/>
    </SafeAreaView>
  )
}

export default ViewScreen