import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
  } from "firebase/firestore";
  import { db } from "../../Services/firebaseConfig";
  
  export async function addContato(novoContato) {
    try {
      const docRef = await addDoc(collection(db, "contato"), novoContato);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  
  export async function getContato() {
    try {
      const querySnapshot = await getDocs(collection(db, "contato"));
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      return products;
    } catch (e) {
      console.error("Error getting documents: ", e);
    }
  }
  
  export async function updateContato(updatedContato) {
    try {
      const docRef = doc(db, "contato", updatedContato.id);
      const contatoData = {
        nome: updatedContato.nome,
        email: updatedContato.email,
        telefone: updatedContato.telefone,
      };
      if (updatedContato.fornecedor) {
        contatoData.fornecedor = updatedContato.fornecedor;
      }
      await updateDoc(docRef, contatoData);
      console.log("Document updated with ID: ", updatedContato.id);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }
  
  export async function deleteContato(id) {
    try {
      await deleteDoc(doc(db, "contato", id));
      console.log("Document deleted with ID: ", id);
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  }
  
  //Pegar os dados do fornecedor
  export async function getFornecedor() {
    try {
      const querySnapshot = await getDocs(collection(db, "fornecedor"));
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      return products;
    } catch (e) {
      console.error("Error getting documents: ", e);
    }
  }
  