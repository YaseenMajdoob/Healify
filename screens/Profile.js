import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '../themes/ThemeProvider'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { COLORS, FONTS, SIZES } from '../constants'
import SelectDropdown from 'react-native-select-dropdown'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../utils/firebaseHelper'

const Profile = ({navigation, route}) => {
    const uid = route.params.uid
    const emojisWithIcons = [
        {title: 'Arabic'},
        {title: 'English'},
        {title: 'French' },
        {title: 'Mandarian' },
      ];

    const update=async(language)=>{
        await updateDoc(doc(db, "users", uid), {
            language: language
          });
    }

    const { dark, colors, setScheme } = useTheme();

    const ToggleTheme = () => {
        dark ? setScheme('light') : setScheme('dark')
    }
    return (
        <View style={{
            flex: 1,
            paddingTop: 50,
            backgroundColor: colors.background,
            alignItems: 'center',
            justifyContent: 'flex-start'
        }}>
            <View style={styles.item}>
                <Text style={{ fontSize: 18, color: colors.text, width: '85%' }}>
                    Theme
                </Text>
                <TouchableOpacity
                    onPress={ToggleTheme}
                >
                    <Ionicons
                        name={dark ? 'sunny-outline' : "partly-sunny-sharp"}
                        size={32}
                        color={dark ? COLORS.white : COLORS.black}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.item}>
                <Text style={{ fontSize: 18, color: colors.text, width: '80%' }}>
                    Chatting language
                </Text>
            <SelectDropdown
                data={emojisWithIcons}
                onSelect={(selectedLang, index) => {
                    update(selectedLang.title);
                }}
                renderButton={(selectedItem, isOpened) => {
                    return (
                        <View style={styles.dropdownButtonStyle}>
                            <Text style={styles.dropdownButtonTxtStyle}>
                                {(selectedItem && selectedItem.title) || 'Select'}
                            </Text>
                        </View>
                    );
                }}
                renderItem={(item, isSelected) => {
                    return (
                        <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                            <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                        </View>
                    );
                }}
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropdownMenuStyle}
            />
            </View>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    item: {
        width: '98%',
        borderColor: '#eee',
        borderBottomWidth: 2,
        height: 60,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    dropdownButtonStyle: {
        width: 150,
        height: 50,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
      },
      dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 15,
        fontWeight: '500',
        color: '#4DA6AB',
      },
      dropdownButtonArrowStyle: {
        fontSize: 28,
      },
      dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
      },
      dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
      },
      dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
      },
      dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 20,
        fontWeight: '500',
        color: '#151E26',
      },
      dropdownItemIconStyle: {
        fontSize: 20,
        marginRight: 8,
      },
});
