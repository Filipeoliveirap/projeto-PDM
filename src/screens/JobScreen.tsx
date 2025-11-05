import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { IJob } from "../../interfaces/Job";
import Job from "../components/job/Job";
import ScrollView from "../components/ScrollView";
import { JobsCreateUpdate } from "./JobsCreateUpdate";

export default function JobScreen() {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<IJob>();
  const [showForm, setShowForm] = useState(false); // controla se mostra a tela de form
  const colorScheme = useColorScheme() ?? "light";

  const onAddJob = (
    id_vehicle: number,
    description: string,
    price: number,
    date: string,
    id?: number
  ) => {
    if (!id || id <= 0) {
      const newJob: IJob = {
        id: Math.random() * 1000,
        id_vehicle,
        description,
        price,
        date,
      };
      setJobs([...jobs, newJob]);
    } else {
      setJobs(jobs.map((job) =>
        job.id === id ? { ...job, id_vehicle, description, price, date } : job
      ));
    }
  };

  const onDeleteJob = (id: number) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  if (showForm) {
    return (
      <JobsCreateUpdate
        onAdd={onAddJob}
        onDelete={onDeleteJob}
        onBack={() => { setShowForm(false); setSelectedJob(undefined); }}
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
        onPress={() => { setSelectedJob(undefined); setShowForm(true); }}
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
        <TouchableOpacity key={job.id} onPress={() => { setSelectedJob(job); setShowForm(true); }}>
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
