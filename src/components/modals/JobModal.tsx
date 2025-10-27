import React, { useEffect, useState } from "react";
import { Modal, View, StyleSheet, TextInput, Text, TouchableOpacity  } from "react-native";
import { IJob } from "../../../interfaces/Job";


export type JobModalProps = {
    visible: boolean;
    onAdd: (id_vehicle: number, description: string, price: number, date: string, id: number) => void;
    onClose: () => void;
    onDelete: (id: number) => void;
    Job?: IJob;
};

export default function JobModal({ visible, onAdd, onClose, onDelete, Job }: JobModalProps) {
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
        onAdd(id_vehicle, description, price, date , id);

        setIdVehicle(0);
        setDescription("");
        setPrice(0);
        setDate("");
        setId(0);
    
        onClose();
    };

    return(
        <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
            <View style={styles.container}>
                <View style={styles.boxContainer}>
                    <TextInput
                        style={styles.boxInput}
                        placeholder="ID Vehicle"
                        keyboardType="numeric"
                        value={id_vehicle.toString()}
                        onChangeText={(text) => setIdVehicle(Number(text) || 0)}
                        autoFocus={true}
                    />
                    <TextInput
                        style={styles.boxInput}
                        placeholder="Description"
                        keyboardType="default"
                        value={description}
                        onChangeText={setDescription}
                    />
                    <TextInput
                        style={styles.boxInput}
                        placeholder="Price"
                        keyboardType="decimal-pad"
                        value={price.toString()}
                        onChangeText={(text) => setPrice(Number(text))}
                    />
                    <TextInput
                        style={styles.boxInput} 
                        placeholder="Date"
                        keyboardType="default"
                        value={date}
                        onChangeText={setDate}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
                            <Text style={styles.buttonText}>Add</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonDelete} onPress={() => onDelete(id)} disabled={id === 0}>
                            <Text style={styles.buttonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
        container: {
            backgroundColor : 'rgba(0, 0, 0, 0.5)',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1

        },
        
        boxContainer: {
            backgroundColor: 'white',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 20,
            padding: 20,
        },
        
        buttonText: {
            fontWeight: 'bold',
            color: 'white',
        },

        buttonAdd: {
            backgroundColor: 'green',
            borderRadius: 5,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
            padding: 20,

        },

        buttonClose: {
            backgroundColor: 'orange',
            borderRadius: 5,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
            padding: 20,
        },

        buttonDelete: {
            backgroundColor: 'red',
            borderRadius: 5,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
            padding: 20,
        },

        buttonContainer: {
            flexDirection: 'row',
            marginTop: 20,
            height: 60,
        },

        boxInput: {
            alignSelf: 'stretch',
            height: 50,
            borderRadius: 5,
            backgroundColor: '#f0f0f0',
            margin: 5,
            paddingHorizontal: 10,
        },

});