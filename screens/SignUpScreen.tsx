import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SignUpScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up Page</Text>
            <TextInput placeholder="Full Name" style={styles.input} />
            <TextInput placeholder="Student/Administrator" style={styles.input} />
            <TextInput placeholder="School Name" style={styles.input} />
            <TextInput placeholder="Password" secureTextEntry style={styles.input} />
            <Button title="Sign Up" onPress={() => {}} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
    input: { width: '80%', padding: 10, borderWidth: 1, marginVertical: 10 },
});

export default SignUpScreen;