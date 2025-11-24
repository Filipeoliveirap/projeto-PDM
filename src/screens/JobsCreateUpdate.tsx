import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/AppNavigator";
import { getJobById, saveJob, deleteJob } from "../services/JobService";
import { IJob } from "../../interfaces/Job";

type Props = NativeStackScreenProps<RootStackParamList, "JobsCreateUpdate">;

export default function JobsCreateUpdate({ route, navigation }: Props) {
  const { jobId } = route.params || {};

  const [id_vehicle, setIdVehicle] = useState(0);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState("");
  const [id, setId] = useState(0);

  useEffect(() => {
    if (jobId) {
      loadJob(jobId);
    }
  }, [jobId]);

  const loadJob = async (id: number) => {
    const job = await getJobById(id);
    if (job) {
      setId(job.id);
      setIdVehicle(job.id_vehicle);
      setDescription(job.description);
      setPrice(job.price);
      setDate(job.date);
    }
  };

  const handleSave = async () => {
    const newJob: IJob = {
      id,
      id_vehicle,
      description,
      price,
      date,
    };

    await saveJob(newJob);
    navigation.goBack();
  };

  const handleDelete = async () => {
    await deleteJob(id);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {id ? "Editar Job" : "Cadastrar Job"}
      </Text>

      <TextInput
        style={styles.boxInput}
        placeholder="ID Vehicle"
        keyboardType="numeric"
        value={id_vehicle.toString()}
        onChangeText={(text) => setIdVehicle(Number(text) || 0)}
      />

      <TextInput
        style={styles.boxInput}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />

      <TextInput
        style={styles.boxInput}
        placeholder="Preço"
        keyboardType="decimal-pad"
        value={price.toString()}
        onChangeText={(text) => setPrice(Number(text))}
      />

      <TextInput
        style={styles.boxInput}
        placeholder="Data"
        value={date}
        onChangeText={setDate}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonAdd} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonClose}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>

        {id !== 0 && (
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
