import { db } from "./config";
import { setDoc, doc, getDoc } from "firebase/firestore";

export default async function setData(collectionName, data, docId) {
  let result = null;
  let error = null;

  try {
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, data);
    
    // If you need the document back:
    const docSnap = await getDoc(docRef);
    result = docSnap;
  } catch (e) {
    error = e.message;
  }

  return { result, error };
}