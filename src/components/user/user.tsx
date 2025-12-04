import React from "react";
import { View, Text, StyleSheet } from "react-native";

export type UserProps = {
  id: number;
  name: string;
  email: string;
};

export default function User({ id, name, email }: UserProps) {
  return (
    <View style={styles.box}>
      <Text style={styles.id}>#{id}</Text>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
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
  },
  id: {
    fontSize: 16,
    fontWeight: "bold",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  email: {
    fontSize: 14,
    color: "#444",
  },
});
