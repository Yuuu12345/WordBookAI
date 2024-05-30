'use client'
import { deleteDoc,getDocs,collection,doc,onSnapshot} from "firebase/firestore";
import db from '../firebaseConfig'

export default async function Delete(docPath, subCollectionNames) {
  const docRef = doc(db, docPath);

  for (const subCollectionName of subCollectionNames) {
    const subCollectionRef = collection(docRef, subCollectionName);
    const snapshot = await getDocs(subCollectionRef);
    for (const doc of snapshot.docs) {
      await Delete(doc.ref.path, subCollectionNames);
    }
  }

  await deleteDoc(docRef);
}