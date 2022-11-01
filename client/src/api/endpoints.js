import axios from 'axios';

const serverUrl = "http://localhost:9000";

export async function login() {
}

export function signUp() {
}

export async function getAllRestrooms() {
  const { data } = await axios.get(`${serverUrl}/restrooms`);
  return data;
}