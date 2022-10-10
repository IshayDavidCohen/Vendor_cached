import react from "react";
import { View, Text, TextInput, StyleSheet} from 'react-native'

const CustomInput = ({value, setValue, placeholder, type='container', secureTextEntry, font}) => {
    const handleInput = () => {
        if (type.includes('digit')) {
            // Digit input logic
            
            // Remove non-digit characters
            value = value.replace(/[^0-9]/g, '')
            
            // Remove leading zeros
            if (value.startsWith('0') && value.length > 1) {
                value = parseInt(value, 10).toString();
            }

            // Empty input = 0
            if (value.length === 0) {
                value = '0';
            }
        }
    }
    handleInput()

    return (
        <View style={styles[type]}>
            <TextInput 
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            style={[styles.input, font ? {fontSize: font} : {}]}
            secureTextEntry={secureTextEntry}/>
        </View>
    )
}

const styles= StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '80%',
        minHeight: '5%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,

        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    digit: {
        width: '35%',
        borderRadius: 15,
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    digitFilled: {
        width: '40%',
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 15,

        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 5,

        shadowColor: "#000000",
        shadowOpacity: 0.05,
        shadowRadius: 1,
        shadowOffset: {
          height: 1,
          width: 0
        },
    },
    input: {},
})

export default CustomInput;  