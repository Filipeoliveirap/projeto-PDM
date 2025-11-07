import React from "react";
import { View, Text, StyleSheet } from "react-native";

export type JobProps = {
  id: number;
  id_vehicle: number;
  description: string;
  price: number;
  date: string;
  latitude?: number;
  longitude?: number;
};

type Props = JobProps;

export default function Job(props: Props) {
  const { id, id_vehicle, description, price, date, latitude, longitude } = props;

  return (
    <View style={styles.box}>
      <View style={styles.header}>
        <Text style={styles.id}>#{id}</Text>
        <Text style={styles.vehicle}>Veículo: {id_vehicle}</Text>
      </View>

      <Text style={styles.description}>{description}</Text>

      <Text style={styles.price}>💰 R$ {Number(price || 0).toFixed(2)}</Text>
      <Text style={styles.date}>📅 {date}</Text>

      {latitude && longitude &&  (
        <View style={styles.locationBox}>
          <Text style={styles.locationText}>
            📍 {latitude.toFixed(5)}, {longitude.toFixed(5)}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 20,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  id: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  vehicle: {
    fontSize: 14,
    color: "#555",
  },
  description: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#222",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  locationBox: {
    marginTop: 8,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  locationText: {
    fontSize: 12,
    color: "#444",
    marginTop: 4,
  },
});
