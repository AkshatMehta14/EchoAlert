import { UserContext } from "@/context/userContext";
import { firestore } from "@/firebase/config";
import { getCurrentPositionAsync, LocationObject } from "expo-location";
import { HeatmapClusters } from "@/components/HeatmapClusters";
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export interface LocationData {
  latitude: number;
  longitude: number;
}

type UserLocationDoc = { email: string } & LocationObject;

const ActiveSchoolShootingPage = () => {
  const { user } = useContext(UserContext);

  const [userLocation, setUserLocation] = useState<LocationObject>();
  const [dataPoints, setDataPoints] = useState<LocationData[]>([]);

  useEffect(() => {
    (async () => {
      const locations = collection(firestore, "locations");
      const querySnapshot = await getDocs(locations);
      const pointLocations: LocationData[] = [];

      querySnapshot.forEach((doc) => {
        const { coords } = doc.data();
        if (!coords) return;

        const { latitude, longitude } = doc.data().coords;
        pointLocations.push({ latitude, longitude });
      });

      console.log("PTS", pointLocations);

      setDataPoints(pointLocations);
    })();
  }, []);

  async function submitToFirebase() {
    const locations = collection(firestore, "locations");
    const docs = await getDocs(
      query(locations, where("email", "==", user?.email))
    );

    let updated = false;
    docs.forEach((doc) => {
      updated = true;
      updateDoc(doc.ref, { ...userLocation });
    });

    if (updated) return;

    addDoc(locations, {
      email: user?.email,
      ...userLocation,
    } as UserLocationDoc);
  }

  // Coordinates for West Windsor-Plainsboro High School North
  const location = {
    latitude: 40.3233, // Latitude for West Windsor-Plainsboro High School North
    longitude: -74.6003, // Longitude for West Windsor-Plainsboro High School North
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Active School Shooting Alert</Text>
      <Text style={styles.description}>Location of the incident:</Text>

      {/* Map */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          ...location,
          latitudeDelta: 0.05, // Adjust as necessary
          longitudeDelta: 0.05, // Adjust as necessary
        }}
      >
        <Marker
          coordinate={location}
          title="West Windsor-Plainsboro High School North"
          description="A description of the school can go here."
        />
        <HeatmapClusters coords={dataPoints} />
      </MapView>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={submitToFirebase}>
        <Text style={styles.submitButtonText}>Submit Location</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footer}>
        Please stay safe and follow local authorities' instructions.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    color: "#666",
    marginBottom: 15,
    textAlign: "center",
  },
  map: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: "#1976d2",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 0.5,
  },
  footer: {
    fontSize: 16,
    color: "#666",
    marginTop: 20,
    textAlign: "center",
  },
});

export default ActiveSchoolShootingPage;
