import { View, Text} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Carousel from 'react-native-snap-carousel/src/carousel/Carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH} from './CarouselItem'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

const carouselNav = () => {
    // Carousel navigation to circumvent hook inside hook. (useNavigation is a hook function)
    const navigation = useNavigation();
    const goTo = (to, storeName) => navigation.navigate(to, {'storeName': storeName});
    return {goTo};
}

const SlideWidget = ({data, onPress, pressResponse, setPressResponse}) => {
    const isCarousel = React.useRef(null)
    
    const hookNav = carouselNav();
    
    const handlePress = (pressEvent, item) => {
        // Executes function, if it has return object with navigateTo, it navigates.

        if (typeof setPressResponse === 'function') {
            if (JSON.stringify(item) !== JSON.stringify(pressResponse)) {
                setPressResponse(item);
            }
        }
        const pressReturn = pressEvent(item);
        
        if (typeof pressReturn === 'object') {
            if ('navigateTo' in pressReturn) {
                hookNav.goTo(pressReturn['navigateTo'], item['title'])
            }
        }
    }

    const _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity onPress={() => {handlePress(onPress, item)}}>
                {CarouselCardItem({item, index})}
            </TouchableOpacity>
        )};

    return (
        <SafeAreaView>
            <Carousel
            ref={isCarousel}
            data={data}
            renderItem={_renderItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            inactiveSlideScale={0.92}
            inactiveSlideOpacity={1}
            useScrollView={true}
            firstItem={data.length - 1}
            />
        </SafeAreaView>
    )
}

export default SlideWidget