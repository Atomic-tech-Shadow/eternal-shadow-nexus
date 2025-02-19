const API_KEY = "90127jjfsx3mfyzyq8q65";
const BASE_URL = "https://devuploads.com/api";

export async function getAccountInfo() {
  try {
    const response = await fetch(`${BASE_URL}/account/info?key=${API_KEY}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des infos du compte :", error);
    return null;
  }
}

export async function getFileList() {
  try {
    const response = await fetch(`${BASE_URL}/file/list?key=${API_KEY}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération de la liste des fichiers :", error);
    return null;
  }
}
