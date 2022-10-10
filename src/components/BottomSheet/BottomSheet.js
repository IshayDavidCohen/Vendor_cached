import { Dimensions, StyleSheet, Text, View,SafeAreaView } from 'react-native';
import React, { useCallback, useEffect, useImperativeHandle, useState} from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withSpring, abs} from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT * 0.45;


const BottomSheet = React.forwardRef(({children}, ref) => {
    
    const active = useSharedValue(false);
    const translateY = useSharedValue(0);

    const scrollTo = useCallback((destination) => {
        'worklet';

        // Handle BottomSheet Activation
        active.value = destination !== 0;

        translateY.value = withSpring(destination, { damping: 10, stiffness: 65})
    }, [])

    const isActive = useCallback(() => {
        return active.value;
    }, [])

    const posY = useCallback(() => {
        return translateY.value
    }, [])

    useImperativeHandle(ref, () => ({scrollTo, isActive, posY}), [scrollTo, isActive, posY]);

    const context = useSharedValue({ y: 0});
    const gesture = Gesture.Pan().onStart(()=> {
        context.value = {y: translateY.value}
    }).onUpdate((event) => {
        translateY.value = Math.max(event.translationY + context.value.y, MAX_TRANSLATE_Y - 70);
    }).onEnd(() => {
        if (-translateY.value > SCREEN_HEIGHT * 0.35) { scrollTo(MAX_TRANSLATE_Y) }
        if (-translateY.value < SCREEN_HEIGHT * 0.35) { 
            scrollTo(0)
            active.value = false;
        }
    })

    const rBottomSheetStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value}],
        };
    });

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
                <View style={styles.line}/>
                {children}
            </Animated.View>
        </GestureDetector>
  )
})

const styles = StyleSheet.create({
    bottomSheetContainer: {
        height: SCREEN_HEIGHT,
        width: '100%',
        backgroundColor: '#F9FBFC',
        borderRadius: 20,
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 0
        },
        position: 'absolute',
        top: SCREEN_HEIGHT,
    },
    line: {
        width: '20%',
        height: 3,
        backgroundColor: 'grey',
        marginVertical: 12,
        alignSelf: 'center',
        borderRadius: 2,
    }
})

export default BottomSheet