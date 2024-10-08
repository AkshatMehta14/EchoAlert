import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SignInScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>
            <TextInput placeholder="Username" style={styles.input} />
            <TextInput placeholder="Password" secureTextEntry style={styles.input} />
            <Button title="Sign In" onPress={() => navigation.navigate('Alert')} />
            <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>Don't have an account? Sign Up</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
    input: { width: '80%', padding: 10, borderWidth: 1, marginVertical: 10 },
    link: { color: 'blue', marginTop: 10 },
});

export default SignInScreen;