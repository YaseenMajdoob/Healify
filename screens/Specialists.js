import { View, Text, StyleSheet, StatusBar, FlatList,TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useTheme } from '../themes/ThemeProvider'
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { getSpecialists } from '../utils/data';

const Specialists = ({ navigation,route }) => {
    const { colors } = useTheme()

    const uid=route.params.uid;

    const specs=getSpecialists();
    console.log(specs)


    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.background,
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 50
        }}>
            <View style={styles.list}>
                <Text style={{fontSize:40,color:"#4DA6AB",margin:20}}>
                    All specialists
                </Text>
                <FlatList
                    data={specs}
                    style={{width:400}}
                    renderItem={({ item }) => 
                    <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate('Chat',{uid:uid,spec:item.id})}>
                        <Text style={{fontSize:16,color:colors.text, marginBottom:5}}>
                            Full name : {item?item.fullName:item}
                        </Text>
                        <Text style={{fontSize:16,color:colors.text}}>
                            Speciality : {item?item.speciality:item}
                        </Text>
                    </TouchableOpacity>
                    }/>
            </View>
        </View>
    )
}

export default Specialists

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:'100%',
        justifyContent:'flex-start',
        alignItems:'flex-start'
    },
    item: {
        margin: 5,
        width: "95%",
        height: 80,
        padding: 15,
        borderBottomWidth:2,
        borderColor:"#eee"
    },
    title: {
        fontSize: 32,
        color: "#000"
    },
    list: {
        width: "100%",
        height:"100%",
        alignItems:'flex-start',
        justifyContent:'flex-start',

    },
    txt:{
        fontSize:18
    }
});
