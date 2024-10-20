import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { firestore } from "@/firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { getCurrentPositionAsync, LocationObject } from "expo-location";

interface LocationData {
  latitude: number;
  longitude: number;
}

const ActiveSchoolShootingPage = () => {
  const [userLocation, setUserLocation] = useState<LocationObject>();

  useEffect(() => {
    const getLocation = async () => {
      setUserLocation(await getCurrentPositionAsync());
    };

    getLocation();
  }, []);

  function submitToFirebase() {
    addDoc(collection(firestore, "locations"), userLocation);
  }

  // Coordinates for West Windsor-Plainsboro High School North
  const location = {
    latitude: 40.3233, // Latitude for West Windsor-Plainsboro High School North
    longitude: -74.6003, // Longitude for West Windsor-Plainsboro High School North
  };

  return (
    <View style={styles.container}>
      {/* Example header text */}
      <Text style={styles.header}>Active School Shooting Alert</Text>
      <Text style={styles.description}>Location of the incident:</Text>

      <MapView
        provider={PROVIDER_GOOGLE}
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
      </MapView>

      <Button title={"Submit Location"} onPress={submitToFirebase} />

      {/* Additional content can be added here */}
      <Text style={styles.footer}>
        Please stay safe and follow local authorities' instructions.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  map: {
    width: "100%",
    height: 300, // Adjust height as needed
    marginBottom: 10,
  },
  footer: {
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
  },
});

export default ActiveSchoolShootingPage;
