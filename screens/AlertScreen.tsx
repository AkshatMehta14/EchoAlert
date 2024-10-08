import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AlertScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>ECHO ALERT</Text>
            <Text style={styles.subtitle}>Making Schools Safer</Text>
            <TouchableOpacity style={styles.alertButton} onPress={() => navigation.navigate('ActiveShooting')}>
                <Text style={styles.buttonText}>SHOOTING ALERT</Text>
            </TouchableOpacity>
            <Text style={styles.emergencyText}>ONLY PRESS IN EMERGENCY</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 36, fontWeight: 'bold' },
    subtitle: { fontSize: 16, fontStyle: 'italic' },
    alertButton: { backgroundColor: '#f44336', padding: 20, borderRadius: 10, marginVertical: 20 },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 20 },
    emergencyText: { color: 'red', fontStyle: 'italic' },
});

export default AlertScreen;