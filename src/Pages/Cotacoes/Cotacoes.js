import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../Services/firebaseConfig";

export async function addCotacao(novoCotacao) {
  try {
    const docRef = await addDoc(collection(db, "cotacao"), novoCotacao);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function addRequisicao(novaRequisicao) {
  try {
    const docRef = await addDoc(collection(db, "requisicao"), novaRequisicao);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
    return null;
  }
}

export async function getCotacao() {
  try {
    const querySnapshot = await getDocs(collection(db, "cotacao"));
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
}

export async function getRequisicao() {
  try {
    const querySnapshot = await getDocs(collection(db, "requisicao"));
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
}

export async function updateCotacao(updatedCotacao_) {
  try {
    const docRef = doc(db, "cotacao", updatedCotacao_.idCotacao);
    console.log(updatedCotacao_.cotacoes);
    console.log(updatedCotacao_.status);
    const data = {
      obsAdmin: updatedCotacao_.obsAdmin,
      cotacoes: updatedCotacao_.cotacoes,
      status: updatedCotacao_.status,
    };
    await updateDoc(docRef, data);
    console.log("Document updated with ID: ", updatedCotacao_.idCotacao);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}

export async function deleteCotacao(id) {
  try {
    await deleteDoc(doc(db, "cotacao", id));
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

export async function getRequisicaoDeCompra() {
  try {
    const querySnapshot = await getDocs(collection(db, "RequisicaoDeCompra"));
    const requisicao = [];
    querySnapshot.forEach((doc) => {
      requisicao.push({ id: doc.id, ...doc.data() });
    });
    return requisicao;
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
}

export async function updateRequisicaoDeCompra(RequisicaoDeCompra) {
  try {
    const docRef = doc(db, "RequisicaoDeCompra", RequisicaoDeCompra.id);
    const contatoData = {
      status: "em cotacao",
    };
    await updateDoc(docRef, contatoData);
    console.log("Document updated with ID: ", RequisicaoDeCompra.id);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}

export async function deleteRequisicaoDeCompra(id) {
  try {
    await deleteDoc(doc(db, "RequisicaoDeCompra", id));
    console.log("Document deleted with ID: ", id);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
}



