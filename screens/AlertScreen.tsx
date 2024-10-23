import { HeatmapClusters } from "@/components/HeatmapClusters";
import { firestore } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export interface LocationData {
  latitude: number;
  longitude: number;
}

const AlertScreen = ({ navigation }: any) => {
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

  const location = {
    latitude: 40.3233,
    longitude: -74.6003,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ECHO ALERT</Text>
      <Text style={styles.subtitle}>Making Schools Safer</Text>
      <TouchableOpacity
        style={styles.alertButton}
        onPress={() => navigation.navigate("ActiveShooting")}
      >
        <Text style={styles.buttonText}>SHOOTING ALERT</Text>
      </TouchableOpacity>
      <Text style={styles.emergencyText}>ONLY PRESS IN EMERGENCY</Text>

      <Text style={styles.title}>ACTIVE SHOOTER PRESENT</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 36, fontWeight: "bold" },
  subtitle: { fontSize: 16, fontStyle: "italic" },
  alertButton: {
    backgroundColor: "#f44336",
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 20 },
  emergencyText: { color: "red", fontStyle: "italic" },
  map: {
    width: "100%",
    height: 300, // Adjust height as needed
    marginBottom: 10,
  },
});

export default AlertScreen;
