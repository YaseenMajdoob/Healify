import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../constants'
import { useTheme } from '../themes/ThemeProvider'

const Input = (props) => {
    const { colors, dark } = useTheme();

    const onChangeText = (text) => {
        props.onInputChanged(props.id, text)
    }
    return (
        <View style={styles.container}>
            <View
                style={[styles.inputContainer, { borderColor: "#4DA6AB",borderWidth:2}]}
            >
                <TextInput
                    {...props}
                    onChangeText={onChangeText}
                    style={styles.input}
                    placeholder={props.placeholder}
                    placeholderTextColor={props.placeholderTextColor}
                />
            </View>
            {props.errorText && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{props.errorText[0]}</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems:'center'
    },
    inputContainer: {
        width: 300,
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding2,
        borderRadius: 12,
        borderWidth: 1,
        marginVertical: 5,
        flexDirection: 'row',
    },
    input: {
        color: "#4DA6AB",
        fontFamily: 'regular',
        paddingTop: 0,
        width:400
    },
    errorContainer: {
        marginVertical: 4,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
    },
})
export default Input
