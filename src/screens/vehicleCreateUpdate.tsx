import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { IJob } from "../../interfaces/Job";

type Props = {
  onAdd: (id_vehicle: number, description: string, price: number, date: string, id: number) => void;
  onDelete: (id: number) => void;
  onBack: () => void; 
  Job?: IJob;
};

export function JobsCreateUpdate({ onAdd, onDelete, onBack, Job }: Props) {
  const [id_vehicle, setIdVehicle] = useState(0);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState("");
  const [id, setId] = useState(0);

 
  useEffect(() => {
    if (Job) {
      setIdVehicle(Job.id_vehicle);
      setDescription(Job.description);
      setPrice(Job.price);
      setDate(Job.date);
      setId(Job.id);
    } else {
      setIdVehicle(0);
      setDescription("");
      setPrice(0);
      setDate("");
      setId(0);
    }
  }, [Job]);

  const handleAdd = () => {
    onAdd(id_vehicle, description, price, date, id);
    onBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Serviços</Text>

      <TextInput
        style={styles.boxInput}
        placeholder="placa"
        keyboardType="numeric"
        value={id_vehicle.toString()}
        onChangeText={(text) => setIdVehicle(Number(text) || 0)}
      />

      <TextInput
        style={styles.boxInput}
        placeholder="cor"
        value={description}
        onChangeText={setDescription}
      />

      <TextInput
        style={styles.boxInput}
        placeholder="id_cliente"
        keyboardType="decimal-pad"
        value={price.toString()}
        onChangeText={(text) => setPrice(Number(text))}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonClose} onPress={onBack}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>

        {id !== 0 && (
          <TouchableOpacity style={styles.buttonDelete} onPress={() => { onDelete(id); onBack(); }}>
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
    marginTop: 20,
    justifyContent: "space-between",
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
