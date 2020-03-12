import React, { useState, useEffect } from "react";
import {
    KeyboardAvoidingView,
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";

import api from "../services/api";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    titleView: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    titlePart1: {
        color: "#333333",
        fontSize: 40,
        fontWeight: "700"
    },
    titlePart2: {
        color: "#f07373",
        fontSize: 40,
        fontWeight: "700"
    },
    form: {
        marginTop: 80,
        paddingHorizontal: 70,
        alignSelf: "stretch"
    },
    label: {
        fontWeight: "700",
        textAlign: "left"
    },
    input: {
        marginTop: 5,
        backgroundColor: "#f6f6f6",
        borderWidth: 1,
        borderColor: "#e3e3e3",
        fontSize: 16,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    button: {
        backgroundColor: "#f07373",
        marginTop: 10,
        padding: 20,
        flex: 1,
        justifyContent: "center"
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "700",
        fontSize: 15
    }
});

export default function Register({ navigation }) {
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (api.defaults.headers.Authorization) {
            navigation.navigate("List");
        }
    }, []);

    async function handleSubmit() {
        const response = await api.post("/register", {
            email
        });

        const { user } = response.data;

        api.defaults.headers.Authorization = user.token;
        navigation.navigate("List");
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.titleView}>
                <Text style={styles.titlePart1}>Dog</Text>
                <Text style={styles.titlePart2}>Breed</Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>E-MAIL:</Text>
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    placeholder="Ex.: email@email.com"
                    value={email}
                    onChangeText={setEmail}
                />
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>ENTRAR</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

Register.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
    }).isRequired
};
