import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type Nav = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu Principal</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("JobScreen")}
      >
        <Text style={styles.buttonText}>Serviços (Jobs)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("VehicleCreateUpdate")}
      >
        <Text style={styles.buttonText}>Veículos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("UsersScreen")}
      >
        <Text style={styles.buttonText}>Usuários</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 40,
  },
  button: {
    padding: 16,
    backgroundColor: "#007bff",
    borderRadius: 8,
    width: "70%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
