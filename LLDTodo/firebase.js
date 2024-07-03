import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB4w3Vwx9kA6l87TwUpX3CZZNauFrvFGKA",
    authDomain: "reactnativetodoapp-dd70a.firebaseapp.com",
    projectId: "reactnativetodoapp-dd70a",
    storageBucket: "reactnativetodoapp-dd70a.appspot.com",
    messagingSenderId: "1009039427739",
    appId: "1:1009039427739:web:161ae23879f5b90afe9e3e"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export async function save(data) {
  try {
    const dbCollection = collection(db, 'tasks');
    const docRef = await addDoc(dbCollection, data);
    return docRef.id;
  } catch (e) {
    return null;
  }
}

export async function load() {
    const data = [];
    const querySnapshot = await getDocs(collection(db, 'tasks'));
    querySnapshot.docs.map(doc =>{
        data.push({
            ...doc.data(),
            id: doc.id
        });
    });

  return data;
}

export async function update(id, data) {
  try {
    const docRef = doc(db, 'tasks', id);
    await updateDoc(docRef, data);
    return true;
  }
  catch (e) {
    console.error(e);
    return false;
  }
}

/**
 * Deletes a task from the string.
 * 
 * @param {string} id 
 *   The id of the task to be removed.
 * @returns 
 *   Whether the task was removed.
 */
export async function remove(id) {
  try {
    const docRef = doc(db, 'tasks', id);
    await deleteDoc(docRef);
    return true;
  }
  catch (e) {
    console.error(e);
    return false;
  }
}


export { db };