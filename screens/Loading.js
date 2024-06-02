import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { useTheme } from '../themes/ThemeProvider'
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Loading = ({navigation}) => {
    const { colors } = useTheme()

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            navigation.navigate('BottomTabNavigation',{uid:uid})
        } else {
            navigation.navigate('Welcome')
        }
    });
    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.background,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <ActivityIndicator size={'large'} />
        </View>
    )
}

export default Loading
