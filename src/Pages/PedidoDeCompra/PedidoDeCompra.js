import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
  } from "firebase/firestore";
  import { db } from "../../Services/firebaseConfig";

  export async function getProducts() {
    try {
        const querySnapshot = await getDocs(collection(db, "produtos"));
        const products = [];
        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });
        return products;
    } catch (e) {
        console.error("Error getting documents: ", e);
    }
}

export async function addRequisicaoDeCompra(novaRequisicao) {
    try {
      const docRef = await addDoc(collection(db, "RequisicaoDeCompra"), novaRequisicao);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }