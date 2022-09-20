import { Text } from 'react-native'
import React from 'react'
import { getMarketplaceData, readData} from '../../utils/firebase/Database'
import SlideWidget from '../../components/SlideWidget/SlideWidget'

const navigatePopulation = (loc) => {
  return {'navigateTo': loc};
}

const PopulateMarket = async () => {
  const data = await getMarketplaceData();
  let slideList = [];
  Object.entries(data).map(([k, v]) => {
      slideList.push(
          <Text key={`${k}_0`} style={{fontSize: 18, fontWeight: 'bold', color: '#051C60', margin: 10}}>{k}</Text>,
          <SlideWidget key={`${k}_1`} data={v} onPress={() => navigatePopulation('Profile')}/>)
  })
  return await slideList
}

export const PopulateProfile = async (profileName) => {
  const data = await readData(profileName);
  let slideList = [];
  Object.entries(data['Items']).map(([k, v]) => {
    slideList.push(
      <Text key={`${k}_0`} style={{fontSize: 18, fontWeight: 'bold', color: '#051C60', margin: 10}}>{k}</Text>,
      <SlideWidget key={`${k}_1`} data={v}/>
    )
  })
  return await slideList
}

export default PopulateMarket