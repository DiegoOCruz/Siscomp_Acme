import { useEffect, useState, useMemo } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableBody,
  InputAdornment,
  Button,
  Switch,
} from "../../Components";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../Services/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { addUsuario, getUsuario, updateUsuario } from "../../Infra/DbUsuarios";
import AddButton from "../../Components/AddButton";
import BlockIcon from "@mui/icons-material/Block";
import { IconButton } from "@mui/material";

export default function Registro({ admin }) {
  const [accessCode, setAccessCode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [emailPt1, setEmailPt1] = useState("");
  const [password, setPassword] = useState("");
  const [complemento, setComplemento] = useState("");
  const [complementolist, setComplementolist] = useState([]);
  const [userList, setUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const db = async () => {
    const tempRows = await getUsuario();
    const newRow = tempRows.map((row) => ({
      id: row.id,
      nome: row.nome,
      email: row.email,
      ativo: row.ativo,
    }));
    setUserList(newRow);
  };

  useEffect(() => {
    db();
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event) => {
    setComplemento(event.target.value);
  };

  useEffect(() => {
    setComplementolist(
      admin
        ? [
            "@admin.acme.com",
            "@rh.acme.com",
            "@comercial.acme.com",
            "@financeiro.acme.com",
            "@ti.acme.com",
          ]
        : [
            "@rh.acme.com",
            "@comercial.acme.com",
            "@financeiro.acme.com",
            "@ti.acme.com",
            "@diretoria.acme.com",
          ]
    );
  }, [admin]);

  const createUser = async () => {
    const email = emailPt1 + complemento;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
      });

      alert(`Usuário ${user.email} cadastrado com sucesso!`);

      const newUser = {
        nome: user.displayName,
        email: user.email,
        ativo: true,
      };
      await addUsuario(newUser);
      db(); //atualiza lista e add novo usuário
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Erro ao cadastrar usuário: ${errorCode} - ${errorMessage}`);
    }
  };

  const navigate = useNavigate();

  // Filtra a lista de usuários com base no termo de busca
  const filteredUserList = useMemo(
    () =>
      userList.filter((user) =>
        user.nome.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, userList]
  );

  const handleEditSubmit = async (user) => {
    const updatedContato = {
      id: user.id,
      //nome: user.nome,
      //email: user.email,
      ativo: !user.ativo,
    };
    //console.log(updatedContato)
    try {
      await updateUsuario(updatedContato);
      //db(); // Update the list of users after editing
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Erro ao atualizar usuário");
    }
    db();
  };

  return (
    <Grid
      container
      justifyContent="center"
      sx={{
        gap: 10,
      }}
    >
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
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              marginTop: "20px",
            }}
          >
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
                onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setEmailPt1(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">@Setor</InputLabel>
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
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <AddButton onClick={createUser}>Cadastrar novo usuário</AddButton>
            </Grid>
          </Grid>
        </Box>
        {admin && (
          <Grid
            container
            sx={{
              border: "1px solid #ccc",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
              padding: "10px",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              fullWidth
              sx={{
                textAlign: "center",
                border: "1px solid #ccc",
                width: "100%",
                marginBottom: "10px",
              }}
            >
              Painel de controle
            </Typography>
            <TextField
              label="Buscar usuário"
              type="text"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: "10px" }}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredUserList.length > 0 ? (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontWeight: "bold",
                        }}
                      >
                        ID
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontWeight: "bold",
                        }}
                      >
                        Nome
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontWeight: "bold",
                        }}
                      >
                        E-mail
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontWeight: "bold",
                        }}
                      >
                        Status
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontWeight: "bold",
                        }}
                      >
                        Bloquear/Habilitar
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredUserList.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.nome}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>
                          {row.ativo ? "Habilitado" : "Bloqueado"}
                        </TableCell>
                        <TableCell>
                          <Switch
                            color="error"
                            checked={row.ativo}
                            onChange={() => handleEditSubmit(row)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="body1">
                Nenhum usuário encontrado.
              </Typography>
            )}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
