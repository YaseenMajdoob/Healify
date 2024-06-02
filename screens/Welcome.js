import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS, SIZES, images } from '../constants'
import { StatusBar } from 'expo-status-bar'
import PageContainer from '../components/PageContainer'
import Button from '../components/Button'
import { useTheme } from "../themes/ThemeProvider"

const Welcome = ({ navigation }) => {
    const { colors } = useTheme()
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <StatusBar style="light" />
            <PageContainer>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        justifyContent: 'flex-start',
                        marginTop:200,
                    }}
                >
                    <Image
                        source={images.logo}
                        style={{
                            height: 150,
                            width: 150,
                            marginBottom: 80,
                        }}
                    />

                    <Text
                        style={{
                            fontSize:30,
                            fontWeight:'bold',
                            color: colors.text,
                            marginBottom: 36,
                        }}
                    >
                        Welcome to Healify
                    </Text>
                    <Text
                        style={{
                            ...FONTS.body3,
                            fontSize:15,
                            color: colors.text,
                            marginBottom: 36,
                        }}
                    >
                        Pick any options to continue
                    </Text>

                    <Button
                        title="Log in"
                        filled
                        onPress={() => navigation.navigate('Login')}
                        style={{
                            width: 300,
                            backgroundColor:"#47BCBA",
                            marginBottom: SIZES.padding,
                        }}
                    />

                    <Button
                        title="Register"
                        onPress={() => navigation.navigate('Register')}
                        style={{
                            width: 300,
                            marginBottom: SIZES.padding,
                            backgroundColor: 'transparent',
                            borderColor: "#47BCBA",
                        }}
                    />
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default Welcome
