import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ActiveShootingScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>ACTIVE SHOOTING</Text>
            <Text style={styles.subtitle}>Keep App Open</Text>
            {/* Add Gyroscope and Mic Status */}
            <Text style={styles.status}>Gyroscope: ON</Text>
            <Text style={styles.status}>Mic: ON</Text>
            {/* Placeholder for map component */}
            <View style={styles.mapPlaceholder}>
                <Text>Map Placeholder</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 36, fontWeight: 'bold' },
    subtitle: { fontSize: 16, marginBottom: 20 },
    status: { fontSize: 18, marginVertical: 10 },
    mapPlaceholder: { width: '80%', height: 200, backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' },
});

export default ActiveShootingScreen;