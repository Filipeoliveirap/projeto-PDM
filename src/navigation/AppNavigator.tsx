import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JobScreen from "../screens/JobScreen";
import JobsCreateUpdate from "../screens/JobsCreateUpdate";

export type RootStackParamList = {
  JobScreen: undefined;
  JobsCreateUpdate: { jobId?: number } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="JobScreen">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
