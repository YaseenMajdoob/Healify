import { View, StyleSheet, FlatList, TextInput, TouchableOpacity, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, images } from '../constants'
import { StatusBar } from 'expo-status-bar'
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons'
import { Bubble, GiftedChat } from 'react-native-gifted-chat'
import { useTheme } from '../themes/ThemeProvider'
import { addDoc, collection, doc, onSnapshot, query, setDoc, where } from 'firebase/firestore'
import { db } from '../utils/firebaseHelper'
import { getMessages, userData } from '../utils/data'
import * as GoogleGenerativeAI from "@google/generative-ai";

const Chat = ({ navigation, route }) => {

    const uid = route.params.uid
    const spec = route.params.spec
    data=userData(uid);

    const [userInput, setUserInput] = useState("");
    const allMessages = getMessages(uid, spec)
    const messages = allMessages.filter(item => item.patient == uid && item.specialist === spec)
    const { colors } = useTheme()

    const sendMessage = async () => {
        await addDoc(collection(db, "messages"), {
            text: userInput,
            patient: uid,
            specialist: spec,
            sender: 'p'

        });

    }
    const language = data.language;

    const tranlatedMessages = []

    const API_KEY = "********************************";

    const tranlateMessage = async (txt) => {
        const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = "You are a translator, do no write anythything beside the translated text. Tanslate the following text to " + language + ".Text: "+txt;
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        Alert.alert(
            '',
            text,
            [
              {text: 'Re-translate', onPress: () => tranlateMessage(txt)},
              {text: 'Close', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              
            ],
            { cancelable: false });
    };

    return (
        <View style={[
            styles.container,
            {
                backgroundColor: colors.background,
            },
        ]}>
            <FlatList
                data={messages}
                renderItem={(item) =>
                    <View style={styles.messageContainer}>
                        <Text style={(item.item.sender == 'p') ? styles.userMessage : styles.messageText}>
                            {item.item.text}
                        </Text>
                        {(item.item.sender == 's') && <TouchableOpacity 
                        onPress={() => { tranlateMessage(item.item.text+", how are you") }} 
                        style={[styles.micIcon, { width: 30, height: 30, padding: 0 }]}>
                            <MaterialIcons
                                name='translate'
                                size={20}
                                color={"#fff"} />
                        </TouchableOpacity>}
                    </View>
                }
                keyExtractor={(item) => item ? item.id : item}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Type a message"
                    onChangeText={text => setUserInput(text)}
                    value={userInput}
                    multiline
                    onSubmitEditing={() => { }}
                    style={styles.input}
                    placeholderTextColor="#4DA6AB"

                />
                <TouchableOpacity style={styles.micIcon} onPress={() => { (userInput != '') ? sendMessage() : null }}>
                    <MaterialIcons
                        name="send"
                        size={20}
                        color="white"
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    />
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 50, paddingBottom: 10 },
    messageContainer: { padding: 10, marginVertical: 5 },
    messageText: {
        fontSize: 16,
        backgroundColor: "#4DA6AB",
        maxWidth: 280,
        padding: 10,
        borderRadius: 10,
        color: '#fff'
    },
    userMessage: {
        fontSize: 16,
        backgroundColor: "#eee",
        alignSelf: 'flex-end',
        alignSelf: 'flex-end',
        maxWidth: 280,
        padding: 10,
        borderRadius: 10,
        color: '#000'
    },
    inputContainer: { flexDirection: "row", alignItems: "center", padding: 10 },
    input: {
        flex: 1,
        padding: 10,
        borderColor: "#4DA6AB",
        borderWidth: 2,
        borderRadius: 10,
        height: 50,
        color: "#4DA6AB",
        fontSize: 16
    },
    micIcon: {
        padding: 10,
        marginLeft: 10,
        backgroundColor: "#4DA6AB",
        borderRadius: 25,
        height: 50,
        width: 50,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 5,
        marginTop: 5,
    },
});

export default Chat
