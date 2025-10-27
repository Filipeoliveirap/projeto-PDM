import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { IJob } from "../../interfaces/Job";
import Job from "../components/job/Job";
import ScrollView from "../components/ScrollView";
import JobModal from "../components/modals/JobModal";

export default function JobScreen() {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<IJob>();
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
        id_vehicle: id_vehicle,
        description: description,
        price: price,
        date: date,
      };
      const jobsPlus: IJob[] = [...jobs, newJob];
      setJobs(jobsPlus);
    }else{
      jobs.forEach(job => {
        if(job.id === id){
          job.id_vehicle = id_vehicle;
          job.description = description;
          job.price = price;
          job.date = date;
        }
      });
    }
    setModalVisible(false);
  };

  const onDeleteJob = (id: number) => {
    const newJobs: Array<IJob> = [];
    for (let index = 0; index <jobs.length; index++) {
      const job = jobs[index];
      if(job.id !== id){
        newJobs.push(job);
      }
    }
    setJobs(newJobs);
    setModalVisible(false);
  };

  const openModal = () => {
    setSelectedJob(undefined);
    setModalVisible(true);
  };

  const openEditModal = (selectedJob: IJob) => {
    setSelectedJob(selectedJob);
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };


  return (
    <ScrollView headerBackgroundColor={{ light: "white", dark: "#121212" }}>
      <TouchableOpacity
        style={[
          styles.headerButtonContainer,
          { backgroundColor: colorScheme === "dark" ? "#121212" : "#fff" },
        ]}
        onPress={openModal}
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
      {jobs.map(job => (
        <TouchableOpacity key={job.id} onPress={() => openEditModal(job)}>
          <Job
            id={job.id}                     
            id_vehicle={job.id_vehicle}
            description={job.description}
            price={job.price}
            date={job.date}
          />
        </TouchableOpacity>
      ))}


      
      <JobModal visible={modalVisible} onAdd={onAddJob} onClose={closeModal} onDelete={onDeleteJob} Job={selectedJob} />
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
});
