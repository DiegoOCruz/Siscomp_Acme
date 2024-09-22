import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc  } from "firebase/firestore"; 
import { db } from "../../Services/firebaseConfig";


export async function getRequisicoes() {
    try {
        const querySnapshot = await getDocs(collection(db, "requisicao"));
        const requisicao = [];
        querySnapshot.forEach((doc) => {
            requisicao.push({ id: doc.id, ...doc.data() });
        });
        return requisicao;
    } catch (e) {
        console.error("Error getting documents: ", e);
    }
}

