import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IJob } from "../../interfaces/Job";
import Job from "../components/job/Job";
import ScrollView from "../components/ScrollView";
import { JobsCreateUpdate } from "./JobsCreateUpdate";
import * as Location from "expo-location";

export default function JobScreen() {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<IJob>();
  const [showForm, setShowForm] = useState(false);
  const colorScheme = useColorScheme() ?? "light";

  const loadJobs = async () => {
    try {
      const storedJobs = await AsyncStorage.getItem("@jobs");
      if (storedJobs) {
        setJobs(JSON.parse(storedJobs));
      }
    } catch (error) {
      console.error("Erro ao carregar jobs:", error);
    }
  };

  const saveJobs = async (jobsToSave: IJob[]) => {
    try {
      await AsyncStorage.setItem("@jobs", JSON.stringify(jobsToSave));
    } catch (error) {
      console.error("Erro ao salvar jobs:", error);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    saveJobs(jobs);
  }, [jobs]);

  const onAddJob = async (
    id_vehicle: number,
    description: string,
    price: number,
    date: string,
    id?: number
  ) => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permissão para acessar localização negada.");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      if (!id || id <= 0) {
        const newJob: IJob = {
          id: Math.random() * 1000,
          id_vehicle,
          description,
          price,
          date,
          latitude: coords.latitude,
          longitude: coords.longitude,
        };
        setJobs((prevJobs) => [...prevJobs, newJob]);
      } else {
        const updatedJobs = jobs.map((job) =>
          job.id === id
            ? { ...job, id_vehicle, description, price, date, ...coords }
            : job
        );
        setJobs(updatedJobs);
      }
    } catch (error) {
      console.error("Erro ao obter localização:", error);
    }
  };

  const onDeleteJob = (id: number) => {
    const filtered = jobs.filter((job) => job.id !== id);
    setJobs(filtered);
  };

  if (showForm) {
    return (
      <JobsCreateUpdate
        onAdd={onAddJob}
        onDelete={onDeleteJob}
        onBack={() => {
          setShowForm(false);
          setSelectedJob(undefined);
        }}
        Job={selectedJob}
      />
    );
  }

  return (
    <ScrollView headerBackgroundColor={{ light: "white", dark: "#121212" }}>
      <TouchableOpacity
        style={[
          styles.headerButtonContainer,
          { backgroundColor: colorScheme === "dark" ? "#121212" : "#fff" },
        ]}
        onPress={() => {
          setSelectedJob(undefined);
          setShowForm(true);
        }}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.headerButton,
            { color: colorScheme === "dark" ? "#fff" : "#000" },
          ]}
        >
          +
        </Text>
      </TouchableOpacity>

      {jobs.map((job) => (
        <TouchableOpacity
          key={job.id}
          onPress={() => {
            setSelectedJob(job);
            setShowForm(true);
          }}
        >
          <Job {...job} />
        </TouchableOpacity>
      ))}

      <View style={styles.boxButton}>
        <TouchableOpacity onPress={() => setShowForm(true)}>
          <Text style={{ color: "#fff" }}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerButton: {
    fontWeight: "bold",
    fontSize: 28,
  },
  boxButton: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 20,
    bottom: 3,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 20,
  },
});
