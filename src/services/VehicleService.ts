import AsyncStorage from "@react-native-async-storage/async-storage";
import { IVehicle } from "../../interfaces/vehicle";

const STORAGE_KEY = "@vehicles";

export async function getVehicles(): Promise<IVehicle[]> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Erro ao buscar veículos:", error);
    return [];
  }
}

export async function getVehicleById(id: number): Promise<IVehicle | undefined> {
  const vehicles = await getVehicles();
  return vehicles.find(v => v.id === id);
}

export async function saveVehicle(vehicle: Partial<IVehicle>): Promise<IVehicle> {
  const vehicles = await getVehicles();

  if (vehicle.id) {
    // Atualizar
    const index = vehicles.findIndex(v => v.id === vehicle.id);
    if (index === -1) throw new Error("Veículo não encontrado para atualizar");

    const updatedVehicle: IVehicle = {
      ...vehicles[index],
      carPlate: vehicle.carPlate || vehicles[index].carPlate,
      id_user: vehicle.id_user ?? vehicles[index].id_user,
      color: vehicle.color || vehicles[index].color,
    };

    vehicles[index] = updatedVehicle;
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
    return updatedVehicle;
  } else {
    // Criar
    const newVehicle: IVehicle = {
      id: Date.now(),
      carPlate: vehicle.carPlate!,
      id_user: vehicle.id_user!,
      color: vehicle.color!,
    };

    vehicles.push(newVehicle);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
    return newVehicle;
  }
}

export async function deleteVehicle(id: number): Promise<void> {
  const vehicles = await getVehicles();
  const updated = vehicles.filter(v => v.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}
