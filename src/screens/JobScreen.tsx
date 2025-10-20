import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { IJob } from '../../interfaces/Job';
import Job from '../components/job/Job';
import ScrollView from '../components/ScrollView';
import JobModal from '../components/modals/JobModal';

export default function JobScreen() {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const colorScheme = useColorScheme() ?? 'light';

  const onAddJob = (id_vehicle: number, description: string, price: number, date: string) => {
    const newJob: IJob = {
      id: Math.random() * 10000,
      id_vehicle,
      description,
      price,
      date,
    };
    setJobs([...jobs, newJob]);
    setModalVisible(false);
  };

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <ScrollView headerBackgroundColor={{ light: 'white', dark: '#121212' }}>
      {/* Header fixo */}
      <TouchableOpacity
        style={[
          styles.headerButtonContainer,
          { backgroundColor: colorScheme === 'dark' ? '#121212' : '#fff' },
        ]}
        onPress={openModal}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.headerButton,
            { color: colorScheme === 'dark' ? '#fff' : '#000' },
          ]}
        >
          +
        </Text>
      </TouchableOpacity>

      {jobs.map((job) => (
        <Job
          key={job.id}
          id={job.id}
          id_vehicle={job.id_vehicle}
          description={job.description}
          price={job.price}
          date={job.date}
        />
      ))}

      <JobModal visible={modalVisible} onAdd={onAddJob} onClose={closeModal} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', 
  },
  headerButton: {
    fontWeight: 'bold',
    fontSize: 28,
  },
});
