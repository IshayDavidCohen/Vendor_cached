import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity} from 'react-native'
import React from 'react'

const _renderItem = ({item, type, onPress}) => (
    <View key={`${item.title}_view`} style={styles[`container_${type}`]}>
        <TouchableOpacity onPress={() => onPress(item.title)} activeOpacity={0.7} style={{height:'100%', width: '100%'}}>
            <Image key={`${item.title}_images`} source={{uri: item.imgUrl}} style={[styles.image, type==='DUAL' ? {resizeMode: 'stretch'} : {resizeMode: 'contain'}]}/> 
            <View key={`${item.title}_textView`} style={styles.overlay}>
                <Text key={`${item.title}_text`} style={styles.title}>{item.title}</Text>
                <Text key={`${item.title}_desc`} style={styles.description}>{item.body}</Text>
            </View>
        </TouchableOpacity>
    </View>
);

const ViewList = ({data, onPress = () => {}, type = 'DUAL'}) => {
    const count = (type === 'DUAL') ? 2 : 1
    const flatlistProps = (count > 1) ? {columnWrapperStyle: {justifyContent: 'space-between'}} : {}
    return (
        <View style={{height:'100%'}}>
            <FlatList key={'_ViewList'} data={data} renderItem={({ item }) => <_renderItem item={item} type={type} onPress={onPress}/>} numColumns={count} keyExtractor={item => item.title.toString()} {...flatlistProps}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container_SINGLE: {
        height: 200,
        width: '90%',
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: '#f7f7f7',
        shadowColor: "#000000",
        shadowOpacity: 0.35,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 0
        },
    },
    container_DUAL: {
        height: 200,
        width: '45%',
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10,
        backgroundColor: '#f7f7f7',
        shadowColor: "#000000",
        shadowOpacity: 0.35,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 0
        },
    },
    overlay: {
        bottom: 0,
        position: 'absolute',
        height: '25%',
        width: '100%',
        backgroundColor: '#e8e8e8',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    image:{
        height: '75%', // Remainder of 100 - banner.height
        width: '100%',
        borderRadius: 10,
    },
    title: {
        marginTop: 5,
        marginLeft: 5,
        fontWeight: 'bold',
    },
    description: {
        marginTop: 2,
        marginLeft: 5,
        color: '#4f4f4f',
        fontSize: 11,
    },
});

export default ViewList