import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import {
  Box,
  Grid,
  HeaderSecundario,
  Typography,
  TextField,
  Button,
  InputAdornment,
  AddButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "../../Components";
import { IconButton } from "@mui/material";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../Services/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { addUsuario } from "../../Infra/DbUsuarios";

export default function FirstAccess() {
  const [accessCode, setAccessCode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  //const [email, setEmail] = useState("");
  const [emailPt1, setEmailPt1] = useState("");
  const [password, setPassword] = useState("");
  const [complemento, setComplemento] = useState("");

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmailPt1 = (e) => {
    setEmailPt1(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChange = (event) => {
    setComplemento(event.target.value);
  };

  const complementolist = ["@rh.acme.com", "@comercial.acme.com", "@financeiro.acme.com", "@ti.acme.com", "@diretoria.acme.com"]; 

  const createUser = async () => {
    const email = (emailPt1+complemento)
    try {
      // Cria o usuário com e-mail e senha
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Obtém o usuário recém-criado
      const user = userCredential.user;

      // Atualiza o perfil do usuário para definir o displayName
      await updateProfile(user, {
        displayName: name,
      });

      // Exibe uma mensagem de sucesso
      alert(`Usuário ${user.email} cadastrado com sucesso!`);
      const newUser = {
        nome: user.displayName,
        email: user.email,
        ativo: true,
      };
      await addUsuario(newUser);
      
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Erro ao cadastrar usuário: ${errorCode} - ${errorMessage}`);
    }
    navigate("/");
  };

  return (
    <Grid
      container
      justifyContent="center"
      sx={{
        gap: 10,
      }}
    >
      <HeaderSecundario />
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {!accessCode && (
            <>
              <Typography variant="h2" gutterBottom>
                Bem-vindo ao sistema de compras!
              </Typography>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Box mb={2}>
                    <Typography variant="h4">Código de acesso</Typography>
                  </Box>
                  <Box mb={2}>
                    <Typography variant="h6">
                      Insira o código de acesso que foi enviado para o seu
                      e-mail.
                    </Typography>
                  </Box>
                  <Box mb={2} sx={{ width: "400px" }}>
                    <TextField
                      label="Código de acesso"
                      variant="outlined"
                      fullWidth
                      sx={{ height: "50px" }}
                    />
                  </Box>
                  <Box mb={2}>
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      onClick={() => setAccessCode(true)}
                    >
                      Acessar
                    </Button>
                    <Typography color="error">
                      Clique no botão para ter acesso
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </>
          )}
        </Box>
        {accessCode && (
          <>
            <Grid
              item
              sx={{
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                <Typography variant="h2" gutterBottom>
                  Cadastro
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Preencha os campos abaixo para completar o seu cadastro.
                </Typography>
                <Grid container spacing={2} mb={2} sx={{ width: "400px" }}>
                  <Grid item xs={12}>
                    <TextField
                      label="Nome"
                      type="text"
                      variant="outlined"
                      fullWidth
                      sx={{ height: "50px" }}
                      onChange={handleName}
                    />
                  </Grid>
                  <Grid container item spacing={0} xs={12}>
                    <Grid item xs={6}>
                      <TextField
                        label="E-mail"
                        type="email"
                        variant="outlined"
                        fullWidth
                        sx={{ height: "50px" }}
                        onChange={handleEmailPt1}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          @Setor
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={complemento}
                          label="@setor"
                          onChange={handleChange}
                        >
                          {complementolist &&
                            complementolist.map((complemento, index) => (
                              <MenuItem key={index} value={complemento}>
                                {complemento}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Senha"
                      type={showPassword ? "text" : "password"}
                      fullWidth={true}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      onChange={handlePassword}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <AddButton onClick={createUser}>
                      Cadastrar novo usuário
                    </AddButton>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
}
