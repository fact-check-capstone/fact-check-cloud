import { Firestore } from "@google-cloud/firestore";

const db = new Firestore();
const predictCollection = db.collection("predictions");

const storeData = async (id, data) => {
  return predictCollection.doc(id).set(data);
};
const deleteData = async (id) => {
  return predictCollection.doc(id).delete();
};

const getDataByUserId = async (userId) => {
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
    results.push({ id: doc.id, ...doc.data() });
  });

  return results;
};

export { storeData, getDataByUserId, deleteData };
