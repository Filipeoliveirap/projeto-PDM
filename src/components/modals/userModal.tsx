import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { IUser } from "../../../interfaces/user";

type UserModalProps = {
  visible: boolean;
  onAdd: (name: string, email: string, id?: number) => void;
  onDelete: (id: number) => void;
  onClose: () => void;
  user?: IUser;
};

export default function UserModal({
  visible,
  onAdd,
  onDelete,
  onClose,
  user,
}: UserModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setId(user.id);
    } else {
      setName("");
      setEmail("");
      setId(undefined);
    }
  }, [user]);

  const handleSave = () => {
    if (!name.trim() || !email.trim()) {
      alert("Preencha nome e email!");
      return;
    }
    onAdd(name, email, id);
    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.box}>
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

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.text}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.text}>Fechar</Text>
            </TouchableOpacity>

            {id !== undefined && (
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => onDelete(id!)}
              >
                <Text style={styles.text}>Excluir</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "85%",
  },
  input: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 20,
  },
  saveBtn: {
    backgroundColor: "green",
    padding: 15,
    flex: 1,
    marginRight: 5,
    borderRadius: 8,
  },
  closeBtn: {
    backgroundColor: "orange",
    padding: 15,
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 8,
  },
  deleteBtn: {
    backgroundColor: "red",
    padding: 15,
    flex: 1,
    marginLeft: 5,
    borderRadius: 8,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
