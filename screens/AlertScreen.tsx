import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker, Heatmap } from "react-native-maps";
import { getDocs, collection } from "@firebase/firestore";
import { firestore } from "@/firebase/config";

// @ts-ignore
const AlertScreen = ({ navigation }) => {

  const heatMapData: any[] | undefined = [];
  const getLocation = async () => {
    const querySnapshot = await getDocs(collection(firestore, "locations"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      // lat, long, 5 weight
      heatMapData.push(doc.data().coords.latitude, doc.data().coords.longitude, 5);
    });
  }
  getLocation().then(r => console.log("get location finished"));


  const location = {
    latitude: 40.3233,
    longitude: -74.6003
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ECHO ALERT</Text>
      <Text style={styles.subtitle}>Making Schools Safer</Text>
      <TouchableOpacity style={styles.alertButton} onPress={() => navigation.navigate('ActiveShooting')}>
        <Text style={styles.buttonText}>SHOOTING ALERT</Text>
      </TouchableOpacity>
      <Text style={styles.emergencyText}>ONLY PRESS IN EMERGENCY</Text>


      <Text style={styles.title}>ACTIVE SHOOTER PRESENT</Text>
      <MapView
        provider={"google"}
        style={styles.map}
        initialRegion={{
          ...location,
          latitudeDelta: 0.005, // Adjust as necessary
          longitudeDelta: 0.005, // Adjust as necessary
        }}
      >
        <Marker
          coordinate={location}
          title="West Windsor-Plainsboro High School North"
          description="A description of the school can go here."
        />
        <Heatmap
          points={heatMapData}
          radius={20}
          opacity={0.7}
        />


      </MapView>
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
  map: {
    width: "100%",
    height: 300, // Adjust height as needed
    marginBottom: 10,
  },
});

export default AlertScreen;
