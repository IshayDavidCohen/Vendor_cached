import { View, Text, ScrollView, StyleSheet, Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import CounterWidget from '../CounterWidget/CounterWidget';

// TODO: Currently CURRENCY is hardcoded as $, in future currency type will be stored in global params and set dynamically in dataTransform
// TODO: Make editable with editable flag to append the component if true
// Add component of sum (Text)

const getComponents = (itemName, itemContent) => {
    return (
    <View style={styles.containerProperties}>
    <Image source={{uri: itemContent['imgUrl']}} style={styles.image}/> 
    <Text style={styles.imageTitle}>{itemName}{'\n'}
        <Text style={styles.imageSuptitle}>Amount: {itemContent['amount']} * {itemContent['Price']}$/{itemContent['Item_unit']}</Text>
    </Text>
    <Text style={styles.itemSum}>{itemContent['amount'] * itemContent['Price']}</Text>
    </View>)}


const dataTransform = (data) => {
    let Components = [];
    let valueSummary = {};
    let infoComponents = [];
    if (Object.keys(data['cart']).length > 0) {

        Object.entries(data['cart']).map(([store, items]) => {

            valueSummary[store] = [];
            Object.entries(items).map(([itemName, itemContent]) => {
                infoComponents.push(getComponents(itemName, itemContent))
                valueSummary[store].push(itemContent['amount'] * itemContent['Price'])
            })
            
            //
            Components.push(
                <View style={styles.container}>
                    <Text style={styles.supplierTitle}>{store}</Text>
                    {infoComponents}
                    <Text style={styles.supplierSum}>{valueSummary[store].reduce((a, b) => a + b, 0)}{'\n'}</Text>
                </View>
            )
            // Reset infoComponents for next supplier
            infoComponents = [];
        })
    }
    return [Components, valueSummary];
}

const ItemSummary = ({data, setSummary}) => {
    console.log('Data updated')
    const [Components, valueSummary]  = dataTransform(data)
    useEffect(() => {setSummary(valueSummary)}, [data])
  return (
    <ScrollView>
        {Components}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#6ba5ef',
        borderRadius: 10,
        marginHorizontal: 10,
        marginTop: 10,

        shadowOpacity: 0.1,
        shadowRadius: 1,
        shadowOffset: {
          height: 6,
          width: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 6.27,
    },
    containerProperties: {
        flexDirection: 'row',
        marginLeft: 10,
        marginTop: 10,
      },
    supplierTitle: {
        fontSize: 18,
        marginLeft: 10,
        marginTop: 5,
        color: 'white',
    },
    supplierSum: {
        marginLeft: 'auto',
        marginRight: '10%',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 14,
        textShadowColor: 'black',
        textShadowRadius: 2,
    },
    imageTitle: {
        fontSize: 14,
        paddingHorizontal: 5,
        marginLeft: 5,
        marginRight: 10,
        color: 'white',
        textShadowColor: 'black',
        textShadowRadius: 1,
    },
    imageSuptitle: {
        fontSize: 12,
        color: 'white',
    },
    itemSum: {
        marginLeft: 'auto',
        marginRight: '10%',
        marginTop: 5,
        fontSize: 13,
        color: 'white',
        textShadowColor: 'black',
        textShadowRadius: 2,
        
    },
    image:{
        width: 32,
        height: 32,
        marginLeft: 15,
        resizeMode: 'contain',
        
        borderRadius: 56 / 2,
        borderWidth: 2,
        borderColor: "#EEEEEE",
    
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: 10,
          width: 10
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
      },
})

export default ItemSummary