import { View, Text, StyleSheet, Platform} from 'react-native';
import React, { useCallback, useState, useImperativeHandle, forwardRef} from 'react';
import Animated, { FadeInUp, FadeOutUp, useSharedValue, useAnimatedStyle,
   useAnimatedGestureHandler, withSequence, withTiming, withDecay,
   withDelay, runOnJS, withSpring} from "react-native-reanimated";
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { PanGestureHandler } from 'react-native-gesture-handler';



const Toast = forwardRef(({text='Text', subtext='Subtext', icon='information', moveTo}, ref) => {
  const TOP_VALUE = Platform.OS === 'ios' ? 25 : 20;
  const toastTopAnimation = useSharedValue(-80);
  const [showing, setShowing] = useState(false);
  const duration = 4000;
  useImperativeHandle(ref, () => ({show,}), [show],)

  const show = useCallback(() => {
    setShowing(true);
    toastTopAnimation.value = withSequence(
      withTiming(TOP_VALUE), withDelay(duration, withTiming(-80, finish => {
        if (finish) {
          runOnJS(setShowing)(false)
        }
      }))
    )
  }, [TOP_VALUE, toastTopAnimation])

  const animatedTopStyles = useAnimatedStyle(() => {
    return {
      top: toastTopAnimation.value,
    }
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = toastTopAnimation.value;
    },
    onActive: (event, ctx) => {
      if (event.translationY < 100) {
      toastTopAnimation.value = withSpring(ctx.startY + event.translationY, { damping: 200, stiffness: 100,})
      }
    },
    onEnd: (event) => {
      if(event.translationY < 0){
        toastTopAnimation.value = withTiming(-100, finish => {
          if (finish){
            runOnJS(setShowing)(false);
          }
        });
      } else if (event.translationY > 0 ) {
        toastTopAnimation.value = withSequence(withTiming(TOP_VALUE), withDelay(duration, withTiming(-100, finish => {
          if (finish){
            runOnJS(setShowing)(false);
          }
        })))
      }
    }
  })

  return ( showing && (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.container, animatedTopStyles]} entering={FadeInUp} exiting={FadeOutUp}>
        <MaterialCommunityIcons style={styles.icon} name={icon} color='black' size={25} />
        <View style={styles.verticalLine}/>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{text}</Text>
          <Text style={styles.sub}>{subtext}</Text>
        </View>
      </Animated.View>
    </PanGestureHandler>
  ))
})

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(205, 227, 242, 0.95)',
        position: 'absolute',
        width: '80%',
        height: 55,
        top: 0,
        borderRadius: 15,
        alignSelf: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
        zIndex: 1,
        shadowColor: "#000000",
        shadowOpacity: 0.15,
        shadowRadius: 5,
        shadowOffset: {
          height: 1,
          width: 0
        },
    },
    icon: {
        paddingHorizontal: 10,
        resizeMode: 'contain',
    },
    textContainer: {
      paddingHorizontal: 10,
    },
    text:{
        fontSize: 15,
        fontWeight: 'bold'
    },
    sub:{
        fontSize: 11,
    },
    verticalLine: {
      height: '55%',
      width: 1,
      backgroundColor: 'rgba(0,0,0, 0.3)',
    },
})

export default Toast