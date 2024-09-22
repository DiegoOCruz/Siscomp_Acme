import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
  } from "firebase/firestore";
  import { db } from "../../Services/firebaseConfig";
  
  export async function addUsuario(novoUsuario) {
    try {
      const docRef = await addDoc(collection(db, "usuario"), novoUsuario);
      console.log("Usuário adicionado com ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

// Obter todos os usuários
export async function getUsuario() {
  try {
    const querySnapshot = await getDocs(collection(db, "usuario"));
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    return users;
  } catch (e) {
    console.error("Erro ao obter documentos: ", e);
    return []; // Retorna um array vazio em caso de erro
  }
}

  export async function updateUsuario(updatedUsuario) {
    try {
      const docRef = doc(db, "usuario", updatedUsuario.id);
      
      const usuarioData = {
        ativo: updatedUsuario.ativo,
      };
      await updateDoc(docRef, usuarioData);
      console.log("Document updated with ID: ", updatedUsuario.id);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }