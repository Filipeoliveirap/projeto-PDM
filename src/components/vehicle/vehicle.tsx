import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export type vehicleProps = {
    id : number,
    carPlate : string,
    id_user : number,
    color : string
};

type props = vehicleProps;

export default function Vehicle(props: props) {
    const { id, carPlate, id_user, color } = props;
    return (
        <View style={styles.box}>
            <Text style={styles.id}>{props.id}</Text>
            <Text style={styles.carPlate}>{props.carPlate}</Text>
            <Text style={styles.id_user}>{props.id_user}</Text>
            <Text style={styles.color}>{props.color}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        backgroundColor: 'white',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 20,
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    id: {
        fontSize: 20,
        fontWeight: 'bold',

    },
    carPlate: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    id_user: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 8,

    },
    color: {
        fontSize: 18,
        fontWeight: '600',
    },

})