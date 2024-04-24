import { Text, View, StyleSheet } from 'react-native'
import React, {useState, useEffect, useCallback, useRef} from 'react'
import { getMarketplaceData, readData, getProfile} from '../../utils/firebase/Database'
import SlideWidget from '../../components/SlideWidget/SlideWidget'


const navigatePopulation = (loc) => {
  return {'navigateTo': loc};
}

const PopulateMarket = async (moveToViewAll) => {
  const data = await getMarketplaceData();
  let slideList = [];
  Object.entries(data).map(([k, v]) => {
      slideList.push(
        <View key={`${k}_0`} style={{width: '100%', flexDirection: 'row'}}>
          <Text key={`${k}_1`} style={styles.category}>{k} </Text>
          <View style={styles.viewContainer}>
            <Text key={`${k}_2`} style={styles.viewText} onPress={() => moveToViewAll(k)}>View all</Text>
          </View>
        </View>,
        <SlideWidget key={`${k}_3`} data={v} onPress={() => navigatePopulation('Profile')}/>)
  })
  return await slideList
}

export const PopulateProfile = async (profileName) => {  
  const data = await readData(profileName);
  return data['Items'];
}

export const populateSearch = async () => {
  const allStores = await readData('');
for (const [key, value] of Object.entries(allStores)) {
    allStores[key] = value.Info
    }
  return allStores
}

const styles = StyleSheet.create({
  category: {
    flex: 1,
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3896DB',
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
})

export default PopulateMarket