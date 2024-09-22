import {
  Grid,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
} from "../../Components";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../Services/firebaseConfig";

import { useNavigate } from "react-router-dom";
import { getUsuario } from "../../Infra/DbUsuarios";

export default function Login({ setLogar, setAdmin, setUserLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userList, setUserList] = useState([]);

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  async function login() {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setLogar(user.email);
        if (user.email) {
          setAdmin(isAdmin(user.email));
          const userLogin = {
            nome: user.displayName,
            email: user.email,
            id: user.uid,
            photoURL: user.photoURL,
          };
          setUserLogin(userLogin);
          getUsuario().then((res) => {
            setUserList(res);
            isBlockUser(res, userLogin).then((res) => {
              if (res) {
                navigate("/home");
              } else {
                signOut(auth).then(() => {
                  // Sign-out successful.
                  setUserLogin({});
                  setLogar("");
                  navigate("/");
                  setError("Usuário bloqueado! Contate o administrador.");
                }).catch((error) => {
                  // An error happened.
                });
              }
            });
          });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        console.log(errorCode, errorMessage);
      });
  }

  function isAdmin(user) {
    //console.log(user.endsWith("@admin.com"));
    return user.endsWith("@admin.acme.com");
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      login();
    }
  };

  const isBlockUser = async (userList, userLogin) => {
    console.log("Verificando usuário:", userLogin);
    return await userList.some((user) => {
      console.log(`Comparando ${user.email} com ${userLogin.email}`);
      if (user.email === userLogin.email) {
        console.log(`Usuário encontrado: ${user.email}, Ativo: ${user.ativo}`);
        return user.ativo;
      }
      return false;
    });
  };

  return (
    <Grid container={true} xs={12}>
      <Grid
        item={true}
        xs={6}
        sm={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          "@media screen and (max-width: 600px)": {
            display: "none",
          },
        }}
      >
        <img src=".\public\ACME_Logo.png" alt="" />
      </Grid>

      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          "@media screen and (max-width: 600px)": {
            height: "100vh",
          },
        }}
      >
        {error && (
          <Alert severity="error">
            {error == "Firebase: Error (auth/invalid-email)."
              ? "ERRO! Usuário e/ou senha inválidos!"
              : error}
          </Alert>
        )}

        <Box mb={2}>
          <Typography variant="h4">Login</Typography>
        </Box>
        <Box sx={{ width: "80%", mb: 2 }}>
          <TextField label="Email" fullWidth={true} onChange={handleEmail} />
        </Box>
        <Box sx={{ width: "80%", mb: 2 }}>
          <TextField
            label="Senha"
            type={showPassword ? "text" : "password"}
            fullWidth={true}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={handlePassword}
            onKeyDown={handleKeyDown}
          />
        </Box>
        <Typography
          sx={{
            marginBottom: "10px",
          }}
        >
          <Link
            to="/forgot-password"
            style={{
              textDecoration: "none",
              color: "blue",
              cursor: "pointer",
            }}
          >
            Esqueci minha senha
          </Link>
        </Typography>
        <Grid
          container={true}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
            gap: 2,
          }}
        >
          <Grid
            item={true}
            sx={{
              width: "30%",
            }}
          >
            <Button variant="outlined" fullWidth onClick={login}>
              Entrar
            </Button>
          </Grid>
          <Grid
            item={true}
            sx={{
              width: "30%",
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => navigate("/first-access")}
            >
              Primeiro acesso? Clique aqui!
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
