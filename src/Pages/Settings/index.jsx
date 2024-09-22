import { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  InputAdornment,
} from "../../Components";
import { getUserLogado, updatePhotoURL, updateUserPassword } from "../../Infra/UserLogado";
import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import PasswordIcon from "@mui/icons-material/Password";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Settings() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const userLogado = async () => {
      try {
        const userFuncao = await getUserLogado();
        setUser(userFuncao);
      } catch (error) {
        console.error("Error fetching user: ", error);
      }
    };

    userLogado();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleUpdatePassword = async () => {
    try {
      await updateUserPassword(password);
      setPassword(""); // Limpa o campo de senha após a atualização
      handleClose(); // Fecha o diálogo
    } catch (error) {
      console.error("Erro ao atualizar a senha: ", error);
    }
  };

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        flexDirection: "column",
        gap: 2,
        padding: 3,
        minHeight: "100vh", // Adiciona altura mínima
        backgroundColor: "#f5f5f5", // Cor de fundo suave
      }}
    >
      <Typography variant="h4" gutterBottom>
        Meus Dados
      </Typography>
      <Grid item xs={12} sm={8} md={6}>
        <Card
          sx={{ borderRadius: 4, boxShadow: 6, backgroundColor: "#ffffff" }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {user ? `ID: ${user.uid}` : "Nenhum usuário logado"}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {user ? `Usuário: ${user.displayName}` : "Nenhum usuário logado"}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {user ? `E-mail: ${user.email}` : "Nenhum usuário logado"}
            </Typography>
            <Grid container>
              <Grid item xs={12}></Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 2,
                }}
              >
                <CardActions>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleClickOpen}
                    startIcon={<PasswordIcon />}
                    sx={{
                      padding: "8px 16px", // Aumenta o padding
                      borderRadius: 3, // Bordas mais arredondadas
                      fontSize: "16px", // Aumenta o tamanho da fonte
                    }}
                  >
                    Alterar Senha
                  </Button>
                </CardActions>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    component: "form",
                    onSubmit: (event) => {
                      event.preventDefault();
                      const formData = new FormData(event.currentTarget);
                      const formJson = Object.fromEntries(formData.entries());
                      const email = formJson.email;
                      //console.log(email);
                      handleClose();
                    },
                    sx: {
                      borderRadius: 4, // Bordas mais arredondadas no Dialog
                      padding: 2, // Aumenta o padding interno do Dialog
                    },
                  }}
                >
                  <DialogTitle>Alterar Senha</DialogTitle>
                  <DialogContent>
                    <TextField
                      id="email"
                      name="email"
                      label="E-mail"
                      type="email"
                      fullWidth
                      variant="standard"
                      InputProps={{
                        readOnly: true,
                      }}
                      value={user ? user.email : ""}
                      sx={{
                        marginBottom: 2, // Adiciona espaçamento abaixo do campo
                      }}
                    />
                    <TextField
                      label="Nova senha"
                      autoFocus
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      variant="standard"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      onChange={handlePassword}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleClose}
                      color="secondary"
                      variant="outlined"
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      variant="outlined"
                      color="primary"
                      onClick={handleUpdatePassword}
                    >
                      Confirmar
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
