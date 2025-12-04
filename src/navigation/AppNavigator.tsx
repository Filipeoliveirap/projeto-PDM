import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import JobScreen from "../screens/JobScreen";
import JobsCreateUpdate from "../screens/JobsCreateUpdate";
import UsersScreen from "../screens/UserScreen";
import VehicleCreateUpdate  from "../screens/vehicleCreateUpdate";

export type RootStackParamList = {
  Home: undefined;
  JobScreen: undefined;
  JobsCreateUpdate: { jobId?: number } | undefined;
  VehicleCreateUpdate: { vehicleId?: number } | undefined;
  UsersScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Menu Principal" }}
        />

        <Stack.Screen
          name="JobScreen"
          component={JobScreen}
          options={{ title: "Meus Serviços" }}
        />

        <Stack.Screen
          name="JobsCreateUpdate"
          component={JobsCreateUpdate}
          options={{ title: "Cadastrar / Editar Job" }}
        />

        <Stack.Screen
          name="VehicleCreateUpdate"
          component={VehicleCreateUpdate}
          options={{ title: "Cadastrar / Editar Veículo" }}
        />

        <Stack.Screen
          name="UsersScreen"
          component={UsersScreen}
          options={{ title: "Usuários" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
