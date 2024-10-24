import { firestore } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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

      {/* Emergency Safety Tips */}
      <Text style={styles.infoHeader}>Emergency Safety Tips</Text>
      <Text style={styles.infoText}>
        • Stay calm and follow the instructions of local authorities.{"\n"}•
        Evacuate the area if safe to do so.{"\n"}• Find a secure shelter and
        stay hidden if evacuation isn't possible.{"\n"}• Do not use elevators;
        use stairs.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  alertButton: {
    backgroundColor: "#d32f2f",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },
  emergencyText: {
    color: "#d32f2f",
    fontStyle: "italic",
    marginBottom: 30,
    fontSize: 14,
  },
  infoHeader: {
    fontSize: 22,
    fontWeight: "600",
    marginVertical: 10,
    color: "#333",
  },
  infoText: {
    fontSize: 16,
    color: "#4CAF50",
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  secondaryButton: {
    backgroundColor: "#1976d2",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default AlertScreen;
