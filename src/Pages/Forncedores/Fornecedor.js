import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc  } from "firebase/firestore"; 
import { db } from "../../Services/firebaseConfig";

export async function addFornecedor(novoFornecedor) {
    try {
        const docRef = await addDoc(collection(db, "fornecedor"), novoFornecedor);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

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

export async function updateFornecedor(updatedFornecedor) {
    try {
        const docRef = doc(db, "fornecedor", updatedFornecedor.id);
        await updateDoc(docRef, {
            razaoSocial: updatedFornecedor.nome,
            email: updatedFornecedor.email,
            telefone: updatedFornecedor.telefone,
        });
        console.log("Document updated with ID: ", updatedFornecedor.id);
    } catch (e) {
        console.error("Error updating document: ", e);
    }
}

export async function deleteFornecedor(id) {
    try {
        await deleteDoc(doc(db, "fornecedor", id));
        console.log("Document deleted with ID: ", id);
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}