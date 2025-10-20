import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { IJob} from '../../interfaces/Job';
import Job from '../components/job/Job';
import ThemedView from '../components/ThemedView'
import ScrollView from '../components/ScrollView';
import JobModal from '../components/modals/JobModal';

export default function JobScreen() {
    const [jobs, setJobs] = useState<IJob[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const onAddJob = (id_vehicle: number, description: string, price: number, date: string) => {
        const newJob: IJob = {
            id: Math.random() * 10000,
            id_vehicle: id_vehicle,
            description: description,
            price: price,
            date: date
        };

        const updateJobs: IJob[] = [...jobs, newJob];

        setJobs(updateJobs);
        setModalVisible(false);
    };

    const openModal =() => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

  return (
    <ScrollView headerBackgroundColor={{ light: 'white', dark: 'black' }}>
        <ThemedView style={styles.headerContainer}>
            <TouchableOpacity onPress={() => openModal()}>
                <Text style={styles.headerButton}>+</Text>
            </TouchableOpacity>
        </ThemedView>
        <ThemedView style={styles.container}>
            {jobs.map(job => <Job key={job.id} id={job.id} id_vehicle={job.id_vehicle} description={job.description} price={job.price} date={job.date} />)}
        </ThemedView>

        <JobModal visible={modalVisible} onAdd={onAddJob} onClose={closeModal} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    stepContainer: {
        gap: 8,
        marginBottom: 8,

    },

    reactLogo: {
        bottom: 0,
        left: 0,
    },

    container: {
        flex: 1,
        backgroundColor: 'gray',
    },

    headerContainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerButton: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingHorizontal: 20,
    },
});
