import { View, Text, Image, Alert, TouchableOpacity } from 'react-native'
import React, { useCallback, useReducer, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { FONTS, SIZES, images } from '../constants'
import { COLORS } from '../constants'
import Input from '../components/Input'
import Button from '../components/Button'
import { reducer } from '../utils/reducers/formReducers'
import { validateInput } from '../utils/actions/formActions'
import { db, firebase_app } from '../utils/firebaseHelper'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { ref, child, set, getDatabase } from 'firebase/database'
import { useTheme } from '../themes/ThemeProvider'
import { doc, setDoc } from 'firebase/firestore'

const initialState = {
    inputValues: {
        fullName: '',
        email: '',
        password: '',
    },
    inputValidities: {
        fullName: false,
        email: false,
        password: false,
    },
    formIsValid: false,
}

const Register = ({ navigation }) => {
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

    const createUser = async (fullName, email, userId) => {
        const userData = {
            fullName,
            email,
            userId,
            signUpDate: new Date().toISOString(),
        }

        await setDoc(doc(db, "users",userData.userId), {
            fullName: userData.fullName,
            email:userData.email,
            userId:userData.userId,
            signUpDate: userData.signUpDate,
          });

        return userData
    }

    const authHandler = async () => {
        const app = firebase_app
        const auth = getAuth(app)
        setIsLoading(true)

        try {
            const result = await createUserWithEmailAndPassword(
                auth,
                formState.inputValues.email,
                formState.inputValues.password
            )

            const { uid } = result.user

            const userData = await createUser(
                formState.inputValues.fullName,
                formState.inputValues.email,
                uid
            )

            if (userData) {
                setIsLoading(false)
                navigation.navigate('BottomTabNavigation',{uid:uid})
            }
        } catch (error) {
            console.log(error)
            const errorCode = error.code
            let message = 'Something went wrong !'
            if (errorCode === 'auth/email-already-in-use') {
                message = 'This email is already in use'
            }

            setError(message)
            setIsLoading(false)
        }
    }

    // Display error if something went wrong
    useEffect(() => {
        if (error) {
            Alert.alert('An error occured', error)
        }
    }, [error])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor:colors.background}}>
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


                    <Input
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['fullName']}
                        id="fullName"
                        placeholder="Enter your full name"
                        placeholderTextColor={"#999"}
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
                        title="Register"
                        onPress={authHandler}
                        isLoading={isLoading}
                        filled
                        style={{
                            width: 300,
                            marginBottom: SIZES.padding,
                            marginVertical: 8,
                        }}
                    />
                    <TouchableOpacity
                        onPress={()=>{navigation.navigate('RegisterS')}}
                        style={{
                            width:300,
                            alignSelf:'center',
                            alignContent:'center',
                            justifyContent:'center',
                            marginBottom: SIZES.padding,
                            marginVertical: 8,
                        }}
                    >
                        <Text
                        style={{
                            ...FONTS.body3,
                            fontSize:20,
                            color: "#4DA6AB",
                            marginBottom: 36,
                            marginTop:40,
                            alignSelf:'center',
                        }}
                    >
                        Register as a specialist {'>>'}
                    </Text>
                    </TouchableOpacity>

                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default Register
