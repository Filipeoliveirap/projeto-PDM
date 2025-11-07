import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { IVehicle } from "../../interfaces/vehicle";

type Props = {
  onSave: (carPlate: string, id_user: number, color: string, id?: number) => void;
  onDelete: (id: number) => void;
  onCancel: () => void;
  vehicle?: IVehicle;
};

export function VehicleCreateUpdate({ onSave, onDelete, onCancel, vehicle }: Props) {
  const [carPlate, setCarPlate] = useState("");
  const [id_user, setIdUser] = useState(0);
  const [color, setColor] = useState("");
  const [id, setId] = useState(0);

  useEffect(() => {
    if (vehicle) {
      setCarPlate(vehicle.carPlate);
      setIdUser(vehicle.id_user);
      setColor(vehicle.color);
      setId(vehicle.id);
    } else {
      setCarPlate("");
      setIdUser(0);
      setColor("");
      setId(0);
    }
  }, [vehicle]);

  const handleSave = () => {
    onSave(carPlate, id_user, color, id);
    onCancel();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Veículo</Text>

      <TextInput
        style={styles.boxInput}
        placeholder="Placa"
        keyboardType="default"
        value={carPlate}
        onChangeText={setCarPlate}
      />

      <TextInput
        style={styles.boxInput}
        placeholder="Cor"
        value={color}
        onChangeText={setColor}
      />

      <TextInput
        style={styles.boxInput}
        placeholder="ID do Cliente"
        keyboardType="decimal-pad"
        value={id_user.toString()}
        onChangeText={(text) => setIdUser(Number(text))}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonAdd} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonClose} onPress={onCancel}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>

        {id !== 0 && (
          <TouchableOpacity style={styles.buttonDelete} onPress={() => { onDelete(id); onCancel(); }}>
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
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonAdd: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonClose: {
    backgroundColor: "orange",
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonDelete: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
