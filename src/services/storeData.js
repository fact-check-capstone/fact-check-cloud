import { Firestore } from "@google-cloud/firestore";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Fungsi untuk mendapatkan __dirname dalam module ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ganti 'path/to/your/service-account-file.json' dengan path ke file JSON kredensial Anda
const serviceAccountPath = path.join(
  __dirname,
  "../../credentials-jagafakta-stuff.json"
);
// import credentials from "../../credentials-jagafakta-stuff.json";

const storeData = async (id, data) => {
  // Inisialisasi Firestore dengan kredensial
  const db = new Firestore({
    projectId: "jagafakta-capstone",
    keyFilename: serviceAccountPath,
  });

  const predictCollection = db.collection("predictions");
  return predictCollection.doc(id).set(data);
};
const getDataByUserId = async (userId) => {
  // Inisialisasi Firestore dengan kredensial
  const db = new Firestore({
    projectId: "jagafakta-capstone",
    keyFilename: serviceAccountPath,
  });

  const predictCollection = db.collection("predictions");
  const querySnapshot = await predictCollection
    .where("userId", "==", userId)
    .get();

  if (querySnapshot.empty) {
    console.log("Tidak ada dokumen yang sesuai!");
    return null;
  }

  const results = [];
  querySnapshot.forEach((doc) => {
    console.log("Data dokumen:", doc.data());
    results.push(doc.data());
  });

  return results;
};

export { storeData, getDataByUserId };
