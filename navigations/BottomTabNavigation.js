import { View, Text, Platform, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, images } from '../constants'
import { Home, Profile, Saved } from '../screens'
import { useTheme } from '../themes/ThemeProvider'
import GeminiChat from '../screens/Gemini'

const Tab = createBottomTabNavigator()


const BottomTabNavigation = ({ navigation, route }) => {
    const uid = route.params.uid
    const { colors } = useTheme()
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    left: 0,
                    elevation: 0,
                    height: 60,
                    backgroundColor: colors.background
                },
            }}>
            <Tab.Screen
                initialParams={{ uid: uid }}
                name="ChatBot"
                component={GeminiChat}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <MaterialCommunityIcons
                                name="robot"
                                size={25}
                                style={{ marginBottom: 2 }}
                                color={
                                    focused
                                        ? "#4DA6AB"
                                        : COLORS.secondaryBlack
                                }
                            />
                        )
                    },
                }}
            />

            <Tab.Screen
                initialParams={{ uid: uid }}
                name="Home"
                component={Home}

                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: focused ? "#4DA6AB" : "#aaa",
                                    height: Platform.OS == 'ios' ? 50 : 60,
                                    width: Platform.OS == 'ios' ? 50 : 60,
                                    top: Platform.OS == 'ios' ? -10 : -20,
                                    borderRadius:
                                        Platform.OS == 'ios' ? 25 : 30,
                                    borderWidth: 2,
                                    borderColor: COLORS.white,
                                }}
                            >
                                <Ionicons
                                    name="chatbubble-ellipses-outline"
                                    size={24}
                                    color={"#fff"}
                                />

                            </View>
                        )
                    },
                }}
            />

            <Tab.Screen
                initialParams={{ uid: uid }}
                name="Setting"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Ionicons
                                name="settings-outline"
                                size={24}
                                color={
                                    focused
                                        ? "#4DA6AB"
                                        : COLORS.secondaryBlack
                                }
                            />
                        )
                    },
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigation
