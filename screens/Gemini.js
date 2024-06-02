import React, { useState, useEffect } from "react";
import * as GoogleGenerativeAI from "@google/generative-ai";
import {
    View,
    Text,
    TextInput,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { useTheme } from "../themes/ThemeProvider";

const GeminiChat = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState(false);

    const API_KEY = "**************************";

    useEffect(() => {
        const startChat = async () => {
            const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const prompt = "hello! ";
            const result = await model.generateContent(prompt);
            const response = result.response;
            const text = response.text();
            console.log(text);
            setMessages([
                {
                    text,
                    user: false,
                },
            ]);
        };
        //function call
        startChat();
    }, []);

    const sendMessage = async () => {
        const userMessage = { text: userInput, user: true };
        setLoading(true);
        const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = userMessage.text;
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        setMessages([...messages, { text, user: false }]);
        setLoading(false);
        setUserInput("");
    };

    console.log(messages)


    const renderMessage = ({ item }) => (
        <View style={styles.messageContainer}>
            <Text style={[styles.messageText, item.user && styles.userMessage]}>
                {item.text}
            </Text>
        </View>
    );

    const { colors } = useTheme();


    return (
        <View style={[
            styles.container,
            {
                backgroundColor: colors.background,
            },
        ]}>
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.text}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Type a message"
                    onChangeText={setUserInput}
                    value={userInput}
                    onSubmitEditing={()=>{
                        sendMessage()
                        const userMessage = { text: userInput, user: true };
                        setMessages([...messages, userMessage]);
                    }}
                    style={styles.input}
                    placeholderTextColor="#4DA6AB"
                />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 50, paddingBottom: 80 },
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
        backgroundColor: "#4DA6AB",
        alignSelf:'flex-end',
        maxWidth: 280,
        padding: 10,
        borderRadius: 10,
        color: '#fff'
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
});

export default GeminiChat;