import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc  } from "firebase/firestore"; 
import { db } from "../../Services/firebaseConfig";

export async function addProduct(novoProduto) {
    try {
        const docRef = await addDoc(collection(db, "produtos"), novoProduto);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
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

export async function updateProducts(updatedProduct) {
    try {
        const docRef = doc(db, "produtos", updatedProduct.id);
        await updateDoc(docRef, {
            nome: updatedProduct.nome,
            descricao: updatedProduct.descricao,
            ncm: updatedProduct.ncm
        });
        console.log("Document updated with ID: ", updatedProduct.id);
    } catch (e) {
        console.error("Error updating document: ", e);
    }
}

export async function deleteProduct(id) {
    try {
        await deleteDoc(doc(db, "produtos", id));
        console.log("Document deleted with ID: ", id);
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}