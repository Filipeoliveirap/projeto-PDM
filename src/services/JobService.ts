import AsyncStorage from "@react-native-async-storage/async-storage";
import { IJob } from "../../interfaces/Job";

const STORAGE_KEY = "@jobs_data";

export async function getAllJobs(): Promise<IJob[]> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export async function getJobById(id: number): Promise<IJob | undefined> {
  const jobs = await getAllJobs();
  return jobs.find((j) => j.id === id);
}

export async function saveJob(job: IJob): Promise<void> {
  const jobs = await getAllJobs();

  if (job.id !== 0) {
    const updated = jobs.map((j) => (j.id === job.id ? job : j));
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } else {
    const newId = jobs.length > 0 ? jobs[jobs.length - 1].id + 1 : 1;
    const newJob: IJob = { ...job, id: newId };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...jobs, newJob]));
  }
}

export async function deleteJob(id: number): Promise<void> {
  const jobs = await getAllJobs();
  const filtered = jobs.filter((j) => j.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}
