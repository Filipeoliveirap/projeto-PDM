import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import ScrollView from "../components/ScrollView";
import { IUser } from "../../interfaces/user";

export default function UsersScreen() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useFocusEffect(
    useCallback(() => {
      loadUsers();
    }, [])
  );

  const loadUsers = async () => {
    const saved = await AsyncStorage.getItem("users");
    if (saved) setUsers(JSON.parse(saved));
  };

  const openAddModal = () => {
    setEditingUser(null);
    setName("");
    setEmail("");
    setModalVisible(true);
  };

  const openEditModal = (user: IUser) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setModalVisible(true);
  };

  const saveUser = async () => {
    if (!name || !email) {
      Alert.alert("Erro", "Preencha nome e email!");
      return;
    }

    let updated: IUser[];

    if (editingUser) {

      updated = users.map((u) =>
        u.id === editingUser.id ? { ...u, name, email } : u
      );
    } else {// Adicionar novo usuário
      updated = [
        ...users,
        {
          id: Date.now(),
          name,
          email,
        },
      ];
    }

    await AsyncStorage.setItem("users", JSON.stringify(updated));
    setUsers(updated);
    setModalVisible(false);
  };

  const deleteUser = async (id: number) => {
    Alert.alert("Excluir", "Deseja realmente excluir este usuário?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          const updated = users.filter((u) => u.id !== id);
          await AsyncStorage.setItem("users", JSON.stringify(updated));
          setUsers(updated);
          setModalVisible(false);
        },
      },
    ]);
  };

  return (
    <>
      <ScrollView headerBackgroundColor={{ light: "white", dark: "#121212" }}>
        <TouchableOpacity
          style={styles.headerButtonContainer}
          onPress={openAddModal}
        >
          <Text style={styles.headerButton}>+</Text>
        </TouchableOpacity>

        {users.map((user) => (
          <TouchableOpacity key={user.id} onPress={() => openEditModal(user)}>
            <View style={styles.userItem}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal transparent visible={modalVisible} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>
              {editingUser ? "Editar Usuário" : "Novo Usuário"}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.btnSave} onPress={saveUser}>
                <Text style={styles.btnText}>Salvar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnCancel}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.btnText}>Cancelar</Text>
              </TouchableOpacity>

              {editingUser && (
                <TouchableOpacity
                  style={styles.btnDelete}
                  onPress={() => deleteUser(editingUser.id)}
                >
                  <Text style={styles.btnText}>Excluir</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  headerButtonContainer: {
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerButton: {
    fontSize: 28,
    fontWeight: "bold",
  },
  userItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 14,
    color: "#555",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginVertical: 6,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  btnSave: {
    backgroundColor: "green",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
  },
  btnCancel: {
    backgroundColor: "orange",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  btnDelete: {
    backgroundColor: "red",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
