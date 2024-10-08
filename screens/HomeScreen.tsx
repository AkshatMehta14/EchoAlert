import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const HomeScreen = ({navigation}) => {
    return (<View style={styles.container}>
            <Text style={styles.title}>ECHO ALERT</Text>
            <Text style={styles.subtitle}>Making Schools Safer</Text>
            <TouchableOpacity style={styles.buttonGreen} onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonBlue} onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>);
};

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'},
    title: {fontSize: 36, fontWeight: 'bold'},
    subtitle: {fontSize: 16, fontStyle: 'italic'},
    buttonGreen: {backgroundColor: '#4CAF50', padding: 15, borderRadius: 10, marginVertical: 10},
    buttonBlue: {backgroundColor: '#03A9F4', padding: 15, borderRadius: 10, marginVertical: 10},
    buttonText: {color: '#fff', fontWeight: 'bold'},
});

export default HomeScreen;