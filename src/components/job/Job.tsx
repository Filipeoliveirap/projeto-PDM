import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export type JobProps = {
    id: number;
    id_vehicle: number;
    description: string;
    price: number;
    date: string;
}

type Props = JobProps;

export default function Job(props: Props) {
  const { id, id_vehicle, description, price, date } = props;

    return (
        <View style={styles.box}>
            <Text style={styles.id}>{id}</Text>
            <Text style={styles.id_vehicle}>{id_vehicle}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.price}>
                R$ {Number(price || 0).toFixed(2)}
            </Text>

            <Text style={styles.date}>{date}</Text>
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
    id_vehicle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 8,

    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2e7d32',
        marginTop: 8,

    },
    date: {
        fontSize: 20,
        fontWeight: 'bold',
    }

})