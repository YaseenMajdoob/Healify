import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Welcome, Login, Register, Chat } from '../screens'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigation from './BottomTabNavigation'
import RegisterS from '../screens/RegisterS'
import Specialists from '../screens/Specialists'
import Loading from '../screens/Loading'
const Stack = createNativeStackNavigator()

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Loading"
                    component={Loading}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Welcome"
                    component={Welcome}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="RegisterS"
                    component={RegisterS}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="BottomTabNavigation"
                    component={BottomTabNavigation}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Chat"
                    component={Chat}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Specialists"
                    component={Specialists}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation
