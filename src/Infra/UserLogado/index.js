import { onAuthStateChanged, updatePassword, updateProfile   } from "firebase/auth";
import { auth } from "../../Services/firebaseConfig";

export function getUserLogado() {
    return new Promise((resolve, reject) => {
        try {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    //console.log(user);
                    resolve(user);
                } else {
                    resolve(null);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
}

export function updateUserPassword(newPassword) {
    const user = auth.currentUser;
    try {
        if (user) {
            updatePassword(user, newPassword) // Use updatePassword em vez de updateUserPassword
                .then(() => {
                    console.log("Senha atualizada com sucesso");
                })
                .catch((error) => {
                    console.error("Erro ao atualizar senha: ", error);
                });
        } else {
            throw new Error("Usuário não logado");
        }
    } catch (e) {
        console.error(e);
    }
}

export function updatePhotoURL() {
    const user = auth.currentUser;
    try {
        if (user) {
            updateProfile(user, { photoURL: "https://rickandmortyapi.com/api/character/avatar/1.jpeg" })
                .then(() => {
                    console.log("URL da foto atualizada com sucesso");
                })
                .catch((error) => {
                    console.error("Erro ao atualizar a URL da foto: ", error);
                });
        } else {
            throw new Error("Usuário não logado");
        }
    } catch (e) {
        console.error(e);
    }
}