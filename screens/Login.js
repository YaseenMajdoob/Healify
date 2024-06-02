import { View, Text, Image, Alert } from 'react-native'
import React, { useCallback, useReducer, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { FONTS, SIZES, images } from '../constants'
import { COLORS } from '../constants'
import Input from '../components/Input'
import Button from '../components/Button'
import { reducer } from '../utils/reducers/formReducers'
import { validateInput } from '../utils/actions/formActions'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { firebase_app } from '../utils/firebaseHelper'
import { useTheme } from '../themes/ThemeProvider'


const initialState = {
    inputValues: {
        email: '',
        password: '',
    },
    inputValidities: {
        email: false,
        password: false,
    },
    formIsValid: false,
}

const Login = ({ navigation }) => {
    
    const [formState, dispatchFormState] = useReducer(reducer, initialState)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const { colors } = useTheme()

    const inputChangedHandler = useCallback(
        (inputId, inputValue) => {
            const result = validateInput(inputId, inputValue)
            dispatchFormState({ inputId, validationResult: result, inputValue })
        },
        [dispatchFormState]
    )

    const loginHandler = async () => {
        const app = firebase_app
        const auth = getAuth(app)
        setIsLoading(true)

        try {
            const result = await signInWithEmailAndPassword(
                auth,
                formState.inputValues.email,
                formState.inputValues.password
            )
            const uid=result.user.uid

            if (result) {
                setIsLoading(false)
                navigation.navigate('BottomTabNavigation',{uid:uid})
            }
        } catch (error) {
            const errorCode = error.code
            let message = 'Something went wrong'

            if (
                errorCode === 'auth/wrong-password' ||
                errorCode === 'auth/user-not-found'
            ) {
                message = 'Wrong email or password'
            }

            setError(message)
            setIsLoading(false)
        }
    }

    // handle errors
    useEffect(() => {
        if (error) {
            Alert.alert('An error occurred', error)
        }
    }, [error])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background}}>
            <PageContainer>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        marginTop:200,
                        marginHorizontal: 22,
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

                    <Input
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['email']}
                        id="email"
                        placeholder="Enter your email"
                        placeholderTextColor={"#999"}
                    />

                    <Input
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['password']}
                        id="password"
                        placeholder="Enter your password"
                        placeholderTextColor={"#999"}
                        secureTextEntry
                    />

                    <Button
                        title="Login"
                        filled
                        isLoading={isLoading}
                        onPress={loginHandler}
                        style={{
                            width: 300,
                            marginBottom: SIZES.padding,
                            marginVertical: 8,
                        }}
                    />
                    
                    
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default Login
