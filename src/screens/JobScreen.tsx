import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { IJob } from "../../interfaces/Job";
import Job from "../components/job/Job";
import ScrollView from "../components/ScrollView";
import { getAllJobs } from "../services/JobService";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type JobScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "JobScreen"
>;

export default function JobScreen() {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const navigation = useNavigation<JobScreenNavigationProp>();
  const colorScheme = useColorScheme() ?? "light";

  useFocusEffect(
    useCallback(() => {
      loadJobs();
    }, [])
  );

  const loadJobs = async () => {
    const data = await getAllJobs();
    setJobs(data);
  };

  return (
    <ScrollView headerBackgroundColor={{ light: "white", dark: "#121212" }}>
      <TouchableOpacity
        style={[
          styles.headerButtonContainer,
          { backgroundColor: colorScheme === "dark" ? "#121212" : "#fff" },
        ]}
        onPress={() => navigation.navigate("JobsCreateUpdate")}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.headerButton,
            { color: colorScheme === "dark" ? "#fff" : "#000" },
          ]}
        >
          +
        </Text>
      </TouchableOpacity>

      {jobs.map((job) => (
        <TouchableOpacity
          key={job.id}
          onPress={() =>
            navigation.navigate("JobsCreateUpdate", { jobId: job.id })
          }
        >
          <Job {...job} />
        </TouchableOpacity>
      ))}

      <View style={styles.boxButton}>
        <TouchableOpacity
          onPress={() => navigation.navigate("JobsCreateUpdate")}
        >
          <Text style={{ color: "#fff" }}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerButton: {
    fontWeight: "bold",
    fontSize: 28,
  },
  boxButton: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 20,
    bottom: 3,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 20,
  },
});
