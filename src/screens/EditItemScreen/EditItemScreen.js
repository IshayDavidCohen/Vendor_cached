import { View, Text, SafeAreaView, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView, ImageBackground} from 'react-native'
import React, { useEffect, useState, useRef, useCallback} from 'react'
import { readData } from '../../utils/firebase/Database'
import IconButton from '../../components/IconButton'
import CustomInput from '../../components/CustomInput'
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import SlideWidget from '../../components/SlideWidget/SlideWidget'
import BottomSheet from '../../components/BottomSheet/BottomSheet'
import CustomButton from '../../components/CustomButton/CustomButton'
import { insertData, insertKey } from '../../utils/firebase/Database'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const POPUP_HEIGHT = -SCREEN_HEIGHT * 0.45;

let supplierItems = {};
let categoryComponentIndex = {};

// To Future Programmers who might use this as a baseline
// Don't. Shit code. It just works.
// Only god knows what horrors i conjured here

const EditItemScreen = ({navigation, route}) => {

    // Parameters coming from Signup Screen
    let profileDoc = route.params.profileDoc;
    const fromSignup = route.params.fromSignup
    // Loaded Flag
    const [Loaded, setLoaded] = useState(false);

    const [categoryComponent, setCategoryComponent] = useState([]);
    const [initiatedCategory, setInitCategory] = useState('');

    // Flags for adding components
    const [display, setDisplay] = useState(false);
    const [addCategoryDisplay, setAddDisplay] = useState(true);
    const [editedCat, setEditedCat] = useState('');

    // SlideWidget ItemPressed and Mapper
    const [clickedIndex, setClickedIndex] = useState(0); // Which SlideWidget window was pressed
    const [itemPressed, setItemPressed] = useState({}); // SlideWidget window content

    // Item Properties - Fix Performance
    const [itemIcon, setItemIcon] = useState('https://endlessicons.com/wp-content/uploads/2012/12/add-icon.png');
    const [itemName, setItemName] = useState('');
    const [itemDesc, setItemDesc] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemUnit, setItemUnit] = useState('');

    // Data Template for SideWidget first window
    const dataTemplate = [
        {'imgUrl': 'https://endlessicons.com/wp-content/uploads/2012/12/add-icon.png',
        'title': 'Add Item',
        'body': 'Click to add item to category',
        'tempCat': ''}
    ]

    // Ref for bottom sheet
    const ref = useRef(null);

    // Category List
    const onCarouselPress = useCallback(() => {
        const isActive = ref?.current?.isActive();
        if (isActive) {
        ref?.current?.scrollTo(0);
        }
        else {
        ref?.current?.scrollTo(POPUP_HEIGHT);
        }
    }, []);

    const onSlideWidgetPress = (item) => {
        setItemPressed(item)

        // Update category
        const category = findCategoryByItem(item)
        setEditedCat(category)

        if (Object.keys(item).length !== 0) {
            if (item.title !== 'Add Item') {
                setItemIcon(item.imgUrl)
                setItemName(item.title)
                setItemDesc(item.body)
                setItemPrice(item.Price)
                setItemUnit(item.Item_unit) 
            }
            else {
                setItemIcon('https://endlessicons.com/wp-content/uploads/2012/12/add-icon.png');
                setItemName('')
                setItemDesc('')
                setItemPrice('')
                setItemUnit('')
            }
        }
        // Set index for which slide was pressed in slide widget
        setClickedIndex(supplierItems[category].indexOf(item))

        // Trigger BottomSheet
        onCarouselPress()
    }

    const updateItems = (profileDoc) => {
        // Clean up supplierItems
        for (const [key, value] of Object.entries(supplierItems)) {
            supplierItems[key].splice(0, 1);
        }

        // Check whether user updates/adds new items
        if (fromSignup === true) {
            // Push entire document
            profileDoc['Items'] = supplierItems;
            insertData('profiles', profileDoc.name, profileDoc)
            navigation.navigate('Marketplace')
        }
        else {
            // Update only Items
            insertKey('profiles', profileDoc.name, 'Items', supplierItems)
            navigation.navigate('Settings')
        }
    }

    const findCategoryByItem = (item) => {
        if (item.title === 'Add Item') {
            return item.tempCat
        }
        else {
            // Iterating over SlideWidget item and getting category by matching item description
            for (const [key, value] of Object.entries(supplierItems)) {
                for (let i = 0; i < value.length; i++) {
                    if (value[i].title === item.title) {
                        return key
                    }
                }
            }
            console.log('DEBUG: Unable to pinpoint category using item title comparison')
        }
    }

    // Creating new SlideWidget
    const createCategory = (category) => {
        return (
            <View>
                <View style={{width:'100%', flexDirection:'row', flexGrow:'wrap'}}>
                    <View style={{width:'80%'}}>
                        <Text style={{fontSize:26, marginLeft:5}}>{category}</Text>
                    </View>
                    <View style={{width:'8%', borderRadius:5, backgroundColor:'#f7818b', marginLeft:30, alignItems:'center'}}>
                        <TouchableOpacity onPress={() => {deleteCategory(category)}}>
                            <MaterialCommunityIcons name="trash-can-outline" size={28} color='#ffffff'/>
                        </TouchableOpacity>
                    </View>
                </View>
                <SlideWidget key={`${category}`} data={supplierItems[category]} onPress={onSlideWidgetPress} pressResponse={itemPressed} setPressResponse={setItemPressed}/>
                <View style={{width: '100%', height: 1, backgroundColor: 'rgba(0,0,0, 0.1)', marginTop: 5, marginBottom:5}}/>
            </View>
        )
    }

    const deleteCategory = (category) => {
        
        let temp_categoryComponent = categoryComponent
        temp_categoryComponent.splice(categoryComponentIndex[category], 1)
        
        supplierItems = removeKey(supplierItems, category);
        categoryComponentIndex = removeKey(categoryComponentIndex, category);

        setCategoryComponent([...temp_categoryComponent])

    }

    const removeKey = (obj, keyToRemove) => {
        const { [keyToRemove]: value, ...output } = obj;
        return output
    }

    // Adding Items to SlideWidget
    const populateCategory = (category) => {
        if (itemName.length > 0 && itemDesc.length > 0 &&
             itemPrice.length > 0 && itemUnit.length > 0  &&
              itemIcon.length > 0) {

                if (supplierItems[category][clickedIndex] !== undefined && clickedIndex != 0) {
                    supplierItems[category][clickedIndex] = {
                        'title': itemName,
                        'imgUrl': itemIcon,
                        'body': itemDesc,
                        'Price': itemPrice,
                        'Item_unit': itemUnit 
                    }
                }
                else {
                    supplierItems[category].push({
                        'title': itemName,
                        'imgUrl': itemIcon,
                        'body': itemDesc,
                        'Price': itemPrice,
                        'Item_unit': itemUnit 
                    })
                }
            // Update SlideWidget
            updateSlideWidgetComponent(category)

            // Close Bottom Sheet after population
            onCarouselPress()

        }
    }

    const updateSlideWidgetComponent = (category) => {
        // Update a specific SlideWidget in categoryComponent
        let temp_categoryComponent = categoryComponent
        temp_categoryComponent[categoryComponentIndex[category]] = createCategory(category)
        setCategoryComponent([...temp_categoryComponent])
    }

    const AddCategoryButton = () => {
        return (
            <View style={{width:'100%', alignItems:'center'}}>
                <CustomButton text={"Add Category"} bgColor={'#38a630'} bRadius={25} onPress={ () => {
                        setDisplay(true);
                        setAddDisplay(false);
                    }}/>
            </View>
        )
    }

    const addCategoryComponent = () => {
        return (
            <View style={{flexDirection:'row', width:'100%'}}>
                <CustomInput placeholder='Category' value={initiatedCategory} setValue={setInitCategory}/>
                <View style={{flexDirection:'row', width:'90%', margin:5}}>
                <View style={{width:'10%', justifyContent:'center', backgroundColor:'#38a630', borderRadius:5, marginRight:2}}>
                <MaterialCommunityIcons style={{alignSelf:'center'}} name="tray-plus" size={24} color='white' onPress={() => {

                    // If field > 2 and key not in category list
                    if (initiatedCategory.length > 2 && !(initiatedCategory in supplierItems)) {

                        // Set Edited Category on category creation
                        setEditedCat(initiatedCategory)

                        // Add category to supplier items as list with template
                        let dataTemplatePlusCategory = dataTemplate
                        dataTemplatePlusCategory[0]['tempCat'] = initiatedCategory
                        supplierItems[initiatedCategory] = dataTemplatePlusCategory


                        // Map new category to index in categoryComponent list
                        categoryComponentIndex[initiatedCategory] = categoryComponent.length


                        let temp_categoryComponent = categoryComponent
                        temp_categoryComponent.push(createCategory(initiatedCategory))

                        // Create slidewiget component for frontend
                        setCategoryComponent([...temp_categoryComponent])

                        // Display add category button
                        setAddDisplay(true);

                        // Hide delete/edit category buttons
                        setDisplay(false)
                        setInitCategory('');
                    }
                }}/>
                </View>
                <View style={{justifyContent:'center', width:'10%', backgroundColor:'rgba(166,169,177, 1)', borderRadius:5}}>
                <MaterialCommunityIcons style={{alignSelf:'center'}} name="backspace-outline" size={24} color='white' onPress={() => {
                    setDisplay(false);
                    setInitCategory('');
                    setAddDisplay(true);
                }}/>
                </View>
            </View>
            </View>
        )
    }

    const loadItemsFromProfile = (fromSignup, profileDocument) => {
        if (fromSignup === undefined || fromSignup === false) {
            supplierItems = profileDocument['Items']


            let i = 0;
            let temp_categoryComponent = [];
            for (const [key, value] of Object.entries(supplierItems)) {
                // Add DataTemplate to the beginning of every category:arr.
                value.unshift(dataTemplate[0])

                // Set the category mapper {Category: Index}
                categoryComponentIndex[key] = i;
                i++;

                temp_categoryComponent.push(createCategory(key))

            }

            setCategoryComponent([...temp_categoryComponent])
        }
    }

    // Try and load profile is sent from SettingScreen
    if (Loaded === false) {
        loadItemsFromProfile(fromSignup, profileDoc);
        setLoaded(true);
    } 

    console.log(categoryComponent)
    console.log('Update DEBUG')
    console.log(supplierItems)
    console.log('Index of clicked item: ' + clickedIndex)

  return (
    <SafeAreaView>
        <View style={{height:'100%'}}>
            <View>
                <ImageBackground source={{uri: profileDoc.banner}} style={{width: '100%', aspectRatio: 2.2,}} resizeMode='cover'>
                    <View style={styles.backgroundView}>
                        <Image source={{uri: profileDoc.icon}}style={{height: 125, width: 125}}/>
                    </View>
                </ImageBackground>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    {display ? addCategoryComponent() : null}
                    {addCategoryDisplay ? AddCategoryButton() : null}
                    <View style={{width: '100%', height: 1, backgroundColor: 'rgba(0,0,0, 0.07)'}}/>
                </View>
            </View>
            <View style={{flex:1}}>
            <ScrollView style={{flex:1}}>
                    {categoryComponent.map((slide) => {return slide})}
            </ScrollView>
            </View>
            <View style={{position:'absolute', bottom:0, width:'100%',backgroundColor: 'rgba(240,240,240, 1)', alignItems:'center', justifyContent:'center'}}>
            <View style={{width: '100%', height: 1, backgroundColor: 'rgba(0,0,0, 0.1)', marginBottom: 5}}/>
                <CustomButton text={fromSignup ? "Add Items" : "Update Items"} onPress={() => {updateItems(profileDoc)}} type='TERITARY'/>
            </View>
        </View>
        <BottomSheet key={'addItemSheet_0'} ref={ref}>
                <View>
                    <View style={{width: '100%', height: 1, backgroundColor: 'rgba(0,0,0, 0.05)', marginBottom: 15, marginTop:15}}/>
                    <View style={{flexDirection:'row', flexWrap: 'wrap', alignItems:'flex-start'}}>
                        <Image source={{uri: itemIcon}} style={styles.image}/> 
                        <View style={{width:'70%'}}>
                            <CustomInput placeholder='Name' value={itemName} setValue={setItemName}/>
                            <CustomInput placeholder='Description' value={itemDesc} setValue={setItemDesc}/>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', width:'100%', justifyContent:'center'}}>
                        <View style={{width:'40%', alignItems:'center'}}>
                            <MaterialCommunityIcons name="cash" size={22} color='#32a869'/>
                            <CustomInput placeholder='Price per unit' value={itemPrice} setValue={setItemPrice}/>
                        </View>
                        <View style={{width:'40%', alignItems:'center'}}>
                            <MaterialCommunityIcons name="weight" size={22} color='#3d3c3c'/>
                            <CustomInput placeholder='Unit' value={itemUnit} setValue={setItemUnit}/>
                        </View>
                    </View>
                    
                    <View style={{alignItems:'center', paddingHorizontal: 20}}>
                        <CustomInput placeholder='Icon URI' value={itemIcon} setValue={setItemIcon}/>
                    </View>

                    <View style={{width: '100%', height: 1, backgroundColor: 'rgba(0,0,0, 0.1)', marginTop: 5}}/>
                    <View style={{alignSelf:'center'}}>
                        <CustomButton text={clickedIndex === 0 ? "Add" : "Update"} onPress={() => {populateCategory(editedCat)}} type='TERITARY'/>
                    </View>
                </View>
            </BottomSheet>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    text:{
        width: '80%',
        color: 'gray',
        marginVertical: 10,
    },
    link: {
        color: '#FDB075'
    },
        backgroundView: {
        position: 'absolute',
        justifyContent:'center',
        alignSelf:'center',
        height: 125,
        width: 125,
        top:50,
        borderRadius: 75,
        overflow: 'hidden',
        marginLeft: 20,
        borderWidth: 1,
        borderColor: '#aaa',
    },
    middleView: {
        marginLeft: 130,
        marginTop: 5,
        
    },
    image:{
        width: 96,
        height: 96,
        marginLeft: 15,
        resizeMode: 'contain',
        
        borderRadius: 96 / 2,
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
    buttonView: {
        width: '100%',
        bottom:0,
        position:'absolute',
        justifyContent:'center',
        alignItems:'center',
    },
    profileButton: {
        position:'absolute',
        alignSelf:'center',
        bottom: 10,
    },
    sheetTitle: {
        color: 'black',
        marginLeft: 15,
        fontSize: 22,
      },
    sheetSuptitle: {
        color: 'gray',
        marginLeft: 15,
        fontSize: 16,
      },
});

export default EditItemScreen