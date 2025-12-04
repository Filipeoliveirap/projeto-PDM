import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";
import { getVehicleById, saveVehicle, deleteVehicle } from "../services/VehicleService";
import { IVehicle } from "../../interfaces/vehicle";

type VehicleScreenNav = NativeStackNavigationProp<
  RootStackParamList,
  "VehicleCreateUpdate"
>;

type VehicleScreenRoute = RouteProp<
  RootStackParamList,
  "VehicleCreateUpdate"
>;

export default function VehicleCreateUpdate() {
  const navigation = useNavigation<VehicleScreenNav>();
  const route = useRoute<VehicleScreenRoute>();
  const vehicleId = route.params?.vehicleId;

  const [vehicle, setVehicle] = useState<Partial<IVehicle>>({
    carPlate: "",
    color: "",
    id_user: 0,
  });

  useEffect(() => {
    if (vehicleId) loadVehicle();
  }, [vehicleId]);

  const loadVehicle = async () => {
    const v = await getVehicleById(vehicleId!);
    if (v) setVehicle(v);
  };

  const handleSave = async () => {
    await saveVehicle({ id: vehicleId, ...vehicle });
    navigation.goBack();
  };

  const handleDelete = async () => {
    if (vehicleId) {
      await deleteVehicle(vehicleId);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Veículo</Text>

      <TextInput
        style={styles.boxInput}
        placeholder="Placa"
        value={vehicle.carPlate}
        onChangeText={(text) => setVehicle({ ...vehicle, carPlate: text })}
      />

      <TextInput
        style={styles.boxInput}
        placeholder="Cor"
        value={vehicle.color}
        onChangeText={(text) => setVehicle({ ...vehicle, color: text })}
      />

      <TextInput
        style={styles.boxInput}
        placeholder="ID do Cliente"
        keyboardType="number-pad"
        value={vehicle.id_user?.toString()}
        onChangeText={(text) => setVehicle({ ...vehicle, id_user: Number(text) })}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonAdd} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonClose} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>

        {vehicleId && (
          <TouchableOpacity style={styles.buttonDelete} onPress={handleDelete}>
            <Text style={styles.buttonText}>Excluir</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  boxInput: {
    alignSelf: "stretch",
    height: 50,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  buttonAdd: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 5,
  },
  buttonClose: {
    backgroundColor: "orange",
    padding: 15,
    borderRadius: 5,
  },
  buttonDelete: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
