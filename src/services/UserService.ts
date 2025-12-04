import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../../interfaces/user";

const STORAGE_KEY = "@users_data";

export async function getAllUsers(): Promise<IUser[]> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export async function getUserById(id: number): Promise<IUser | undefined> {
  const users = await getAllUsers();
  return users.find((u) => u.id === id);
}

export async function saveUser(user: IUser): Promise<void> {
  const users = await getAllUsers();

  if (user.id !== 0) {
    const updated = users.map((u) => (u.id === user.id ? user : u));
    return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
  const newUser = { ...user, id: newId };

  return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...users, newUser]));
}

export async function deleteUser(id: number): Promise<void> {
  const users = await getAllUsers();
  const filtered = users.filter((u) => u.id !== id);
  return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}
